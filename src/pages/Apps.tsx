import { SearchRounded } from "@mui/icons-material";
import { ApplicationCard } from "../components/ApplicationCard";
import { Search } from "../components/Search";
import { Button, ContainedIconButton } from "../components/styles";
import { TempletHeader } from "../components/TempletHeader";
import { sampleApps } from "../sample/apps";
import { noop, useModal } from "../utils";
import { CreateApp } from "../components/CreateApp";
import { useNavigate } from "react-router";
import { network } from "../main";
import { useEffect, useState } from "react";

interface Props {
    onClick?: () => void;
}

export function Apps(props: Props) {
    const nav = useNavigate();
    const [modal, open, close] = useModal((open, close) => (
        <CreateApp onSubmit={() => nav("1/info")} onCancel={close} />
    ));
    const { onClick } = props;

    const [content, setContent] = useState("");

    useEffect(() => {
        network.test().then(setContent);
    }, []);

    const apps = sampleApps.map((app, i) => (
        <ApplicationCard id={i + ""} {...app} onClick={onClick ?? noop} />
    ));
    return (
        <>
            <TempletHeader button={<Button onClick={open}>New app</Button>} />
            <Search
                search={search}
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

function search(query: string): [Promise<string[]>, () => void] {
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
