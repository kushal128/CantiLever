import React, { Component } from 'react'

export class NewsItems extends Component {
   
    render() {
        let { title, description, imageURL, newsURL , author , date} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={!imageURL? "https://static.toiimg.com/thumb/msid-107812622,imgsize-1340954,width-900,height-1200,resizemode-6/107812622.jpg":imageURL} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}....</h5>
                        <p className="card-text">{description}....</p>
                        <p ClassName="card-text"><small ClassName="text-body-secondary">By {!author?"unknown":author} published on {new Date(date).toGMTString()}</small></p>
                        <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>    {/* here "_blank" is used to open the news in ar tab  */}
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems
