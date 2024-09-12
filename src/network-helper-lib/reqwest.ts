// с помощью тайпскрипта можно описывать запросы
// например .throwsUnauthorized()
//          .throwsNotFound()
//          .finish()
//
// и тип должен меняться так, чтобы на получившемся объекте
// появлялись методы catchUnathorized(e =>)
//                   catchNotFound()

// теряется информация о типе после .then()
// Решение?: Add `this` type parameter to `HandlerInterface`

import { AxiosError, AxiosResponse } from "axios";

export class Reqwest<T, S = HandlerInterface<T, unknown>> {
    constructor(private response: Promise<AxiosResponse<T>>) {}

    throwsUnauthorized(): Reqwest<T, Throws<S, "unauthorized">> {
        return this as Reqwest<T, Throws<S, "unauthorized">>;
    }

    build(): S {
        return new ReqwestHandler(this.response) as S;
    }
}

class ReqwestHandler<T> {
    unauthorizedHandler?: (e: AxiosError) => void;
    catchUsed = false;

    constructor(private promise: Promise<T>, catchUsed?: boolean) {
        this.catchUsed = !!catchUsed;
    }

    then<H>(handler: (arg: T) => H): ReqwestHandler<H> {
        this.promise = this.promise.then(handler) as never;
        return this as never as ReqwestHandler<H>;
    }

    private addCatch = () => {
        if (!this.catchUsed) {
            this.promise.catch((e: AxiosError) => {
                if (e.response) {
                    if (e.response.status == 401 && this.unauthorizedHandler) {
                        this.unauthorizedHandler(e);
                    }
                }
            });

            this.catchUsed = true;
        }
    };

    catchUnauthorized: (handler: (e: AxiosError) => void) => ReqwestHandler<T> =
        handler => {
            this.unauthorizedHandler = handler;
            this.addCatch();
            return this;
        };
}

type HandlerInterface<T, H> = {
    then: (handler: (arg: T) => H) => HandlerInterface<H, never>;
    catch: (e: unknown) => void;
};

type Throws<Collector, Text extends string> = Collector &
    Remap<
        {
            simple: (handler: (e: AxiosError) => void) => Collector;
        },
        Text
    >;

type Remap<Type, Text extends string> = {
    [Props in keyof Type as `catch${Capitalize<Text>}`]: Type[Props];
};

// let x = new Reqwest(axios.get<number>("")).throwsUnauthorized().build();
