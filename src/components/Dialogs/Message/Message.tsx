import React, {FC} from 'react';

type PropsType = {
    message: string
}

export const Message: FC<PropsType> = (props) => {
    return (
        <span>{props.message}</span>
    );
};