import { Middleware, Dispatch, AnyAction } from 'redux';

const loggerMiddleware: Middleware<{}, any, Dispatch<AnyAction>> =
  (store) => (next) => (action) => {
    const { meta } = action;

    console.groupCollapsed(`Dispatching action ${meta.prefix[1] === "[api_called_success]" ? 'success' : meta.prefix[1] === "[api_calling]" ? 'calling' : 'failed'}:`, action.type);
    console.log('Previous state:', store.getState());
    console.log('Action:', action);
    next(action);
    console.log('Next state:', store.getState());
    console.groupEnd();
  };

export default loggerMiddleware;
