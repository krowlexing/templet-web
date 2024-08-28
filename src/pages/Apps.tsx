import { SearchRounded } from "@mui/icons-material";
import { ApplicationCard } from "../components/ApplicationCard";
import { Search } from "../components/Search";
import { Button, ContainedIconButton } from "../components/styles";
import { TempletHeader } from "../components/TempletHeader";
import { sampleApps } from "../sample/apps";
import { noop, useModal } from "../utils";
import { CreateApp } from "../components/CreateApp";
import { useNavigate } from "react-router";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { network } from "../network/network";
import { appsThunks } from "../store/requests/apps";

interface Props {
    onClick?: () => void;
}

export function Apps(props: Props) {
    const nav = useNavigate();
    const [modal, open, close] = useModal((open, close) => (
        <CreateApp
            onSubmit={formData => {
                dispatch(
                    appsThunks.create({
                        ...formData,
                        version: "",
                        status: formData.stopped ? 2 : 0,
                    })
                );
                dispatch(appsThunks.allApps(0));
            }}
            onCancel={close}
        />
    ));

    const { onClick } = props;

    const dispatch = useAppDispatch();
    const { value: appObjs, status } = useAppSelector(
        state => state.requests.allApps
    );
    const search = useAppSelector(state => state.requests.search);

    useEffect(() => {
        dispatch(appsThunks.allApps(0));
    }, [dispatch]);

    const apps = appObjs?.map((app, i) => (
        <ApplicationCard {...app} onClick={onClick ?? noop} />
    ));
    return (
        <>
            <TempletHeader button={<Button onClick={open}>New app</Button>} />
            <Search
                search={query =>
                    performSearch(() => dispatch(appsThunks.search(query)))
                }
                placeholder="Search apps..."
                button={
                    <ContainedIconButton
                        variant="contained"
                        sx={{ marginRight: 1 }}
                    >
                        <SearchRounded />
                    </ContainedIconButton>
                }
            />
            {apps}
            {modal}
        </>
    );
}

const searchResults = [
    "Matrix app",
    "Some other app",
    "Third app - It's the best",
];

function searchDemo(query: string): [Promise<string[]>, () => void] {
    let cancelled = false;
    let rejection: () => void;
    return [
        new Promise((resolve, reject) => {
            if (cancelled) {
                reject("cancelled");
            }
            const id = setTimeout(
                () => resolve(searchResults.filter(x => x.startsWith(query))),
                1000
            );
            rejection = () => {
                clearTimeout(id);
                reject("cancelled");
            };
        }),
        () => {
            cancelled = true;
            rejection && rejection();
        },
    ];
}

function performSearch(submitSearch: () => void): [Promise<void>, () => void] {
    let cancelled = false;
    let rejection: () => void;
    return [
        new Promise((resolve, reject) => {
            if (cancelled) {
                reject("cancelled");
            }
            const id = setTimeout(() => resolve(submitSearch()), 1000);
            rejection = () => {
                clearTimeout(id);
                reject("cancelled");
            };
        }),
        () => {
            cancelled = true;
            rejection && rejection();
        },
    ];
}
