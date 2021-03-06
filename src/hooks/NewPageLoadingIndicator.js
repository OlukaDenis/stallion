import { setIsLoadingNewPage } from "../state/ui/action";
import { useStore } from 'react-redux';
import { Router } from "../utilities/i18n";
import { composeActionFromThunk } from "../utilities/common";
import { useEffect } from "react";

export const useIsLoadingNewPage = (newPageParams) => {
    
    const store = useStore((state) => state);

    useEffect(() => {
        if(!newPageParams) return;
        const setIsLoadingPage = (isLoading) => store.dispatch(composeActionFromThunk(setIsLoadingNewPage(isLoading)));
        
        (async () => {
            try {
                setIsLoadingPage(true);
                let timerID = hideNewPageLoadingIndicatorAfter(setIsLoadingPage, 80000);
                await Router.push(newPageParams);
                setIsLoadingPage(false);
                clearTimeout(timerID);
            } catch {
                setIsLoadingPage(false);
            } finally {
                setIsLoadingPage(false);
            }
        })();
    }, [newPageParams]);
}

const hideNewPageLoadingIndicatorAfter = (setIsLoadingPage, timeout) => {
  return setTimeout(() => {
        setIsLoadingPage(false);
      }, timeout);
}