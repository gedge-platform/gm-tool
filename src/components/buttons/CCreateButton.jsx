import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import theme from '@/styles/theme';

const useStyles = makeStyles(() =>
    createStyles({
        '@global': {
            '.btn_create': {
                justifyContent: 'flex-start',
                minWidth: 148,
                height: 30,
                padding: '0 28px 0 0',
                font: 'inherit',
                color: `${theme.colors.defaultDark}`,
                border: '1px solid #bec3ca',
                borderRadius: '3px',
                background: 'linear-gradient(#fdfdfd,#f6f6f9)',
                boxShadow: 'inset 0 0 1px #fff',
                '& .MuiButton-label': {
                    padding: '0 12px',
                    height: '100%',
                    borderRight: '1px solid #bec3ca',
                    boxShadow: 'inset -1px 0 0 #fff',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: 10,
                        height: 10,
                        right: 9,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'url(../images/bullet/createBtn_add.png) no-repeat right top',
                    }
                },
                '&:hover': {
                    '& .MuiButton-label::after': {
                        backgroundPositionY: '-10px'
                    }
                },
                 '&.check .MuiButton-label::after': {
                    backgroundImage: 'url(../images/bullet/createBtn_check.png)'
                 }
            }
        }
    }),
);

const CCreateButton = (props) => {
    const {
        children,
        type,
        style,
        icon,
        buttonEventType = "button",
        onClick,
        role = "ROLE_USER",
        ...other
    } = props;
    const classes = useStyles();

    return (
        <>
            <Button
                type={buttonEventType}
                className={`btn_create ${icon}`}
                style={style}
                onClick={onClick}
                {...other}
            >
                {children}
            </Button>
        </>
    );
};

export { CCreateButton };
