import { useEffect, useCallback, useRef, useState } from 'react';
import '../styles/portfolio.css';
import { tagNamings } from '../tags';

import filterIcon from '../images/icons/filter.svg';
import sortIcon from '../images/icons/sort.svg';
import clearIcon from '../images/icons/clear.svg';

const linksEnabled = true; /* I prefer it disabled for now */
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
        refVideo.current.play().catch(() => {});
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
        try {
            document.querySelector("video[poster='" + image + "']").play();
        } catch (e) {
            console.log("Cannot play video")
        }
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
    //const  = data.larger ? { gridColumn: "auto / span 2" } : {}
    const itemClasses = `item ${data.larger ? "larger" : ""}`

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
        <a href={data.url} className={itemClasses} target="_blank" rel="noreferrer" >
            <Item />
        </a>
    : 
        <div className={itemClasses}>
            <Item />
        </div>
    );
}

function PortfolioFilter({tags, setFilter, filter, setNewestSort, newestSort}) {
    return (
        <div className="portfolioFilters">
            <div>
                <div className="label">
                    <img src={filterIcon} alt="Filter by" />
                </div>
                <ul className="tags">
                    {tags.map(tag => (
                        <li className={filter.includes(tag) ? "active" : ""} key={tag} onClick={() => filter.includes(tag) ? setFilter([]) : setFilter([tag])}>{tagNamings[tag]}</li>
                    ))}
                </ul>
                <div className="label">
                    <img src={sortIcon} alt="Sort by" />
                </div>
                <ul className="tags">
                    <li onClick={() => setNewestSort(!newestSort)} className={newestSort ? "active" : ""}>Latest</li>
                </ul>     
            </div>
            <div>
                {filter.length > 0 || newestSort ? 
                <button onClick={() => {
                    setFilter([])
                    setNewestSort(false)
                }}>
                    <img src={clearIcon} alt="Clear items" />
                    <span>Clear filters</span>
                </button>
                : null } 
            </div>
        </div>
    )
}
export function Portfolio({data}) {
    const [filter, setFilter] = useState([])
    const [newestSort, setNewestSort] = useState(false)

    const d = !newestSort ? data : [...data].sort((a, b) => (b.weigth - a.weigth))
    console.log(d)
    return (
        <>
            <PortfolioFilter 
                tags={["projects", "achievements"]}
                filter={filter}
                setFilter={setFilter} 
                newestSort={newestSort}
                setNewestSort={setNewestSort} />
            <div className="portfolioGrid">
                {d.map((item) => {
                    if (!item.tags.some(tag => filter.includes(tag)) && filter.length !== 0) return null

                    return (
                        <PortfolioItem key={item.name} data={item} />
                    )
                })}
            </div>
        </>
    )
}
