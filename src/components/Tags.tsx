import { Tag } from "./Tag";

interface Props {
    tags: string[];
}

export function Tags(props: Props) {
    const { tags } = props;
    return (
        <>
            {tags[0] && <Tag value={tags[0]} />}
            {tags.length > 1 && `+ ${tags.length - 1}`}
        </>
    );
}
