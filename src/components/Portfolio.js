import { useEffect, useCallback, useRef } from 'react';
import '../styles/portfolio.css';

const linksEnabled = false; /* I prefer it disabled for now */
const images = require.context('../images', true);

function PortfolioMedias({data}) {
    if (data) {
        return (
            <div>
                {data.map(item => {
                    const image = images('./' + item.logo).default;
                    return (
                        <a className="mediaLogo" href={item.url} target="_blank" key={item.url} rel="noreferrer">
                            <img src={image} alt={item.name} />
                        </a>
                    )
                })}
            </div>
        );
    } else {
        return <></>; 
    }
}

function Video({image, video}) {
    const refVideo = useRef(null);
    useEffect(() => {
        if (!refVideo.current) {
            return;
        }

        refVideo.current.defaultMuted = true;
        refVideo.current.muted = true;

        refVideo.current.children[0].setAttribute("src", video);
        refVideo.current.play();
    }, [video]);

    return (
        <video
            ref={refVideo}
            poster={image}
            className="itemBackground" id="bg1"
            loop
            autoPlay
            playsInline 
        >
            <source type="video/mp4" />
        </video>
    )
}

function PortfolioBackground({data}) {
    const image = images('./' + data.image).default;

    const play = useCallback(() => {
        document.querySelector("video[poster='" + image + "']").play();
    }, [image]);

    useEffect(() => {
        if (data.video) {
            window.addEventListener('mousedown', play);
        
            return () => {
                window.removeEventListener('mousedown', play);
            };
        }
    }, [play, data]);

    if (data.video) {
        const video = images('./' + data.video).default;

        return (
            <Video video={video} image={image} />
        )
    } else {
        return (
            <div className="itemBackground" style={{backgroundImage: `url('${image}')`}}></div>
        )
    }
}
function PortfolioItem({data}) {
    const Item = () => (
        <>
            <PortfolioBackground data={{
                image: data.image, 
                video: data.video
            }}/>
            
            <div className="itemInner">
                <div className="itemContent">
                    <h2>{data.name}</h2>
                    <span className="itemDescription">{data.org}</span>
                </div>
                <PortfolioMedias data={data.media}/>
            </div>
        </>
    );
    return (data.url && linksEnabled ? 
        <a href={data.url} className="item" target="_blank" rel="noreferrer">
            <Item />
        </a>
    : 
        <div className="item">
            <Item />
        </div>
    );
}
export function Portfolio({data}) {
    return (
        <div className="portfolioGrid">
            {data.map((item) => (
                <PortfolioItem key={item.name} data={item} />
            ))}
        </div>
    )
}