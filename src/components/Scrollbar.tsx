import React from 'react';

const Scrollbar = () => {
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const thumbRef = React.useRef<HTMLDivElement | null>(null);
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    const handleScrollContent = () => {
        const thumbEle = thumbRef.current;
        const contentEle = contentRef.current;
        if (!thumbEle || !contentEle) return;

        thumbEle.style.top = `${(contentEle.scrollTop * 100) / contentEle.scrollHeight}%`;
    };

    const handleClickTrack = (e: React.MouseEvent) => {
        const trackEle = trackRef.current;
        const contentEle = contentRef.current;
        if (!trackEle || !contentEle) return;

        const bound = trackEle.getBoundingClientRect();
        const percentage = (e.clientY - bound.top) / bound.height;
        contentEle.scrollTop = percentage * (contentEle.scrollHeight - contentEle.clientHeight);
    };

    React.useEffect(() => {
        const thumbEle = thumbRef.current;
        const contentEle = contentRef.current;
        if (!thumbEle || !contentEle) return;

        const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
        thumbEle.style.height = `${scrollRatio * 100}%`;
        
        const handleResize = () => {
            const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
            thumbEle.style.height = `${scrollRatio * 100}%`;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
        const ele = thumbRef.current;
        const contentEle = contentRef.current;
        if (!ele || !contentEle) return;

        const startPos = {
            top: contentEle.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };

        const handleMouseMove = (e: MouseEvent) => {
            const dy = e.clientY - startPos.y;
            const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
            contentEle.scrollTop = startPos.top + dy / scrollRatio;
            updateCursor(ele);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resetCursor(ele);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, []);

    const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
        const ele = thumbRef.current;
        const contentEle = contentRef.current;
        if (!ele || !contentEle) return;

        const touch = e.touches[0];
        const startPos = {
            top: contentEle.scrollTop,
            y: touch.clientY,
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            const dy = touch.clientY - startPos.y;
            const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
            contentEle.scrollTop = startPos.top + dy / scrollRatio;
            updateCursor(ele);
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            resetCursor(ele);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }, []);

    const updateCursor = (ele: HTMLDivElement) => {
        ele.style.cursor = 'grabbing';
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
    };

    const resetCursor = (ele: HTMLDivElement) => {
        ele.style.cursor = 'grab';
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };

    return (
        <div className="container">
            <div
                className="container__content"
                ref={contentRef}
                onScroll={handleScrollContent}
            >
                {React.useMemo(() =>
                    Array(20).fill(0).map((_, index) => (
                        <p className="playground__placeholder" key={index}>
                            Very seasons dominion set abundantly over. Unto morning years man you night our without.
                            Won't days. Fruitful firmament moveth man fruit, from, day it, gathered second also night
                            given there fly us was whose. Image after you also. Likeness, without second fifth own
                            wherein fifth fourth. Spirit female living together don't evening darkness creeping beginning
                            living own beginning itself brought third face them bring saying creeping green.
                        </p>
                    )), [])
                }
            </div>

            <div className="scrollbar">
                <div
                    className="scrollbar__track"
                    ref={trackRef}
                    onClick={handleClickTrack}
                />
                <div
                    className="scrollbar__thumb"
                    ref={thumbRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                />
            </div>
        </div>
    );
};

export default Scrollbar;
