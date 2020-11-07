import React from 'react'
import JumboData from '../../fixture/jumbo.json';

export const Body = () => {
    return (
        <div className="body">
            {JumboData.map((data) => {
                return (
                    <div className={`body__data${data.id}`} key={data.id}>
                        <div className="body__pane">
                            <h1>{data.title}</h1>
                            <h2>{data.subTitle}</h2>
                        </div>
                        <div className="body__pane body__pane__img">
                            <img src={data.image} alt={data.alt} />
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
