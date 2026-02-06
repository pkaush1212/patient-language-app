import { makeStyles, IconButton, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router";
import IRequest from "../../../config/types/entities/IRequest";
import InnerContainerWithBorder from "../../../modules/layouts/InnerContainerWithBorder";
import { UserInfoContext } from "../../../shared/contexts/UserContextProvider";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Request from "../../../api/request";
import FrontendRoutes from "../../../config/frontendRoutes";
import { useSnackbar } from "notistack";
import {
    RequestState,
    SNACK_REQ_LOAD_ERROR,
    UserTypes,
    VIEW_REQUEST_TITLE,
} from "../../../config/constants";
import RequestDetails from "../../../modules/request/view/details/RequestDetails";
import MatchedAvatar from "../../../modules/request/view/details/MatchedAvatar";
import InterpreterRequestOptions from "../../../modules/request/view/options/interpreter/InterpreterRequestOptions";
import RequesterRequestOptions from "../../../modules/request/view/options/requester/RequesterRequestOptions";
import {
    IRequestDetails,
    RequestDetailsContext,
} from "../../../shared/contexts/RequestDetailsContextProvider";
import Helmet from "react-helmet";
import RequestBanner from "../../../modules/request/view/details/banner/RequestBanner";
import {
    requestDetailsReducer,
    UPDATE_REQUEST,
} from "../../../shared/reducers/requestDetails";

interface RequestPageProps {}

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: "5%",
    },
    headerRow: {
        display: "flex",
        justifyContent: "space-between",
    },
    reqOptions: {
        display: "flex",
        marginRight: "2%",
        marginTop: "1%",
        [theme.breakpoints.down("sm")]: {
            marginTop: "2%",
        },
    },
    title: {
        display: "flex",
        flexDirection: "row",
    },
    titleText: {
        fontSize: 25,
        fontWeight: 600,
        paddingTop: "4%",
        [theme.breakpoints.down("sm")]: {
            fontSize: 22,
        },
    },
    banner: {
        display: "flex",
        paddingTop: "2%",
        paddingLeft: "1%",
    },
}));

// TODO: Prevent hard-linking to request not allowed access to.
const RequestPage: React.FC<RequestPageProps> = () => {
    const { userInfo } = useContext(UserInfoContext);
    const history = useHistory();
    const params: { id: string } = useParams();

    const initialRequestDetails: IRequestDetails = {
        request: null,
    };
    const [requestDetails, dispatch] = useReducer(requestDetailsReducer, {
        request: null,
    });

    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();

    useEffect(() => {
        const fetchRequest = async (requestId: string) => {
            Request.getById(requestId, userInfo!.accessToken)
                .then((res) => {
                    const request: IRequest = res.data;
                    dispatch({ type: UPDATE_REQUEST, payload: request });
                })
                .catch((error) => {
                    enqueueSnackbar(SNACK_REQ_LOAD_ERROR, {
                        variant: "error",
                    });
                    history.push(FrontendRoutes.DASHBOARD_ROUTE);
                });
        };

        fetchRequest(params.id);
    }, [params.id]);

    return (
        <React.Fragment>
            <Helmet>
                <title>{VIEW_REQUEST_TITLE}</title>
            </Helmet>
            <InnerContainerWithBorder
                content={
                    <RequestDetailsContext.Provider
                        value={{ requestDetails, dispatch }}
                    >
                        <div className={styles.container}>
                            <div className={styles.headerRow}>
                                <div className={styles.title}>
                                    <div>
                                        <IconButton
                                            aria-label="back"
                                            color="primary"
                                            onClick={() => history.goBack()}
                                        >
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </div>
                                    <div>
                                        <Typography
                                            className={styles.titleText}
                                        >
                                            View Request
                                        </Typography>
                                    </div>
                                </div>
                                <div className={styles.reqOptions}>
                                    {requestDetails.request &&
                                        userInfo?._type ===
                                            UserTypes.REQUESTER && (
                                            <RequesterRequestOptions />
                                        )}
                                    {requestDetails.request &&
                                        userInfo?._type ===
                                            UserTypes.INTERPRETER && (
                                            <InterpreterRequestOptions />
                                        )}
                                </div>
                            </div>

                            {requestDetails.request && (
                                <div>
                                    <div className={styles.banner}>
                                        <RequestBanner
                                            requestState={
                                                requestDetails.request
                                                    .state as RequestState
                                            }
                                        />
                                    </div>

                                    <div>
                                        <MatchedAvatar />
                                    </div>
                                    <div>
                                        <RequestDetails />
                                    </div>
                                </div>
                            )}
                        </div>
                    </RequestDetailsContext.Provider>
                }
            />
        </React.Fragment>
    );
};

export default RequestPage;
