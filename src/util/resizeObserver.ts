const _global = window as any;

type ResizeConfig = [Element, ((...args: any) => void)[]];

function createResizeObserver(dom: Element, resizeFn: (...args: any) => void) {
    // window.ResizeObserver：这是一个能针对某个元素实行大小、位置变化监听的API，是一个类，它提供了一个观察器，该观察器将在每个 resize 事件上调用，
    if (!window.ResizeObserver) {
        return {};
    }

    let resizeObserver: ResizeObserver;
    let resizeObserverConfig: ResizeConfig[];

    let isObserver = false;

    if (_global._RESIZE_OBSERVER_CONFIG) {
        resizeObserverConfig = _global._RESIZE_OBSERVER_CONFIG as ResizeConfig[];
        const index = resizeObserverConfig.findIndex((v) => v[0] === dom);
        if (index > -1) {
            isObserver = true;
            resizeObserverConfig[index][1].push(resizeFn);
        } else {
            resizeObserverConfig.push([dom, [resizeFn]]);
        }
    } else {
        resizeObserverConfig = [];
        resizeObserverConfig.push([dom, [resizeFn]]);
    }
    _global._RESIZE_OBSERVER_CONFIG = resizeObserverConfig;

    if (_global._RESIZE_OBSERVER) {
        resizeObserver = _global._RESIZE_OBSERVER;
    } else {
        resizeObserver = new ResizeObserver((entries) => {
            if (!Array.isArray(entries) || !entries.length) {
                return;
            }
            for (let entry of entries) {
                const resizeItem = resizeObserverConfig.find((v) => v[0] === entry.target);
                const resizeHandles = resizeItem ? resizeItem[1] : undefined;
                if (resizeHandles) {
                    resizeHandles.forEach((handle) => handle(entry));
                }
            }
        });
    }

    _global._RESIZE_OBSERVER = resizeObserver;

    if (!isObserver) {
        resizeObserver.observe(dom);
    }
    return resizeObserver;
}

function unResizeObserver(dom: Element, handle: (...args: any) => void) {
    if (!window.ResizeObserver) {
        return;
    }
    let resizeObserverConfig: ResizeConfig[] | null = null;
    let resizeObserver: ResizeObserver | null = null;
    if (_global._RESIZE_OBSERVER_CONFIG) {
        resizeObserverConfig = _global._RESIZE_OBSERVER_CONFIG;
    }
    if (_global._RESIZE_OBSERVER) {
        resizeObserver = _global._RESIZE_OBSERVER;
    }
    if (resizeObserver && resizeObserverConfig) {
        if (handle) {
            const index = resizeObserverConfig.findIndex((v) => v[0] === dom);
            resizeObserverConfig[index][1] = resizeObserverConfig[index][1].filter((v) => v !== handle);
            if (resizeObserverConfig[index][1].length === 0) {
                resizeObserver.unobserve(dom);
                resizeObserverConfig = resizeObserverConfig.filter((v) => v[0] !== dom);
            }
        } else {
            resizeObserverConfig = resizeObserverConfig.filter((v) => v[0] !== dom);
            resizeObserver.unobserve(dom);
        }
        _global._RESIZE_OBSERVER_CONFIG = resizeObserverConfig;
    }
}

const resizeObserver = {
    createResizeObserver,
    unResizeObserver,
};

export default resizeObserver;
