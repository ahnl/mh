import { useEffect, useCallback } from 'react';
import '../styles/portfolio.css';

const images = require.context('../images', true);

function PortfolioAdditional({additional}) {
    if (additional) {
        return (
            <div>
                {additional.map(item => {
                    const image = images('./' + item).default;
                    return (
                        <img className="mediaLogo" src={image} alt={item} key={item} />
                    )
                })}
            </div>
        );
    } else {
        return <></>; 
    }
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
            <video poster={image} autoPlay={true} muted={true} loop={true} playsInline={true} className="itemBackground" id="bg1">
                <source src={video} type="video/mp4" />
            </video>
        )
    } else {
        return (
            <div className="itemBackground" style={{backgroundImage: `url('${image}')`}}></div>
        )
    }
}
function PortfolioItem({data}) {
    return (
        <div className="item">
            <PortfolioBackground data={{
                image: data.image, 
                video: data.video
            }}/>
            
            <div className="itemInner">
                <div className="itemContent">
                    <h2>{data.name}</h2>
                    <span className="itemDescription">{data.org}</span>
                </div>
                <PortfolioAdditional additional={data.additional}/>
            </div>
        </div>
    )
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