import { useState } from "react";
import { AppUser } from "../data/users";
import { SearchWithButton } from "./SearchWithButton";
import { network } from "../network/network";
import { cancellablePromise } from "../network-helper-lib/cancellable";

export function UserSearch() {
    const [users, setUsers] = useState<AppUser[]>([]);

    const search = (query: string) =>
        network.users.search(query).then(response => setUsers(response.data));

    const cancellableSearch = cancellablePromise(search, 1000);

    // return (
    //     <SearchWithButton
    //         search={cancellableSearch}
    //         options={users}
    //         getLabel={function (obj: unknown): string {
    //             throw new Error("Function not implemented.");
    //         }}
    //         getKey={function (obj: unknown): number {
    //             throw new Error("Function not implemented.");
    //         }}
    //         onSelect={function (userId: number): void {
    //             throw new Error("Function not implemented.");
    //         }}
    //         onUnselect={function (): void {
    //             throw new Error("Function not implemented.");
    //         }}
    //         onButtonClick={function (): void {
    //             throw new Error("Function not implemented.");
    //         }}
    //     />
    // );
}
