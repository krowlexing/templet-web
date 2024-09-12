import { SearchRounded } from "@mui/icons-material";
import { ApplicationCard } from "../components/ApplicationCard";
import { Button, ContainedIconButton } from "../components/styles";
import { TempletHeader } from "../components/TempletHeader";
import { noop, useModal } from "../utils";
import { CreateApp } from "../components/CreateApp";
import { useNavigate } from "react-router";

import { useEffect, useState } from "react";
import { network } from "../network/network";
import { AppData } from "../data/app";
import { cancellablePromise } from "../network-helper-lib/cancellable";
import { SearchWithButton } from "../components/SearchWithButton";

interface Props {
    onClick?: (id: number) => void;
}

export function Apps(props: Props) {
    const { onClick } = props;

    const nav = useNavigate();
    const [appsData, setApps] = useState<AppData[] | undefined>(undefined);

    const [modal, open, close] = useModal((open, close) => (
        <CreateApp
            onSubmit={formData => {
                network.apps.create({
                    ...formData,
                    version: "",
                    status: formData.stopped ? 2 : 0,
                });
                network.apps
                    .all()
                    .then(res => res.data)
                    .then(setApps);
            }}
            onCancel={close}
        />
    ));

    const search = (query: string) =>
        network.apps
            .search(query)
            .then(res => res.data)
            .then(setApps);

    const cancellableSearch = cancellablePromise(search, 1000);

    useEffect(() => {
        network.apps
            .all()
            .then(res => res.data)
            .then(setApps);
    }, []);

    const apps = appsData?.map(app => (
        <ApplicationCard {...app} onClick={onClick ?? noop} />
    ));
    return (
        <>
            <TempletHeader button={<Button onClick={open}>New app</Button>} />
            {/* <SearchWithButton
                search={cancellableSearch}
                placeholder="Search apps..."
                button={
                    <ContainedIconButton
                        variant="contained"
                        sx={{ marginRight: 1 }}
                    >
                        <SearchRounded />
                    </ContainedIconButton>
                }
                options={appsData ?? []}
                getLabel={app => app.title}
                getKey={app => app.id}
                onSelect={() => {}}
                onUnselect={() => {}}
                onButtonClick={() => {}}
            /> */}
            {apps}
            {modal}
        </>
    );
}
