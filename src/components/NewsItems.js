import React from 'react'

const NewsItems=(props)=> {
  
    let { title, description, imgUrl, newsUrl, author, date,source } = props;
    return (
      <div>
        <div className="card" >
          <img src={!imgUrl ? "https://img.etimg.com/thumb/msid-92727104,width-1070,height-580,overlay-economictimes/photo.jpg" : imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className='card-title'>{title}...<span className="badge bg-success" style={{fontSize:"0.8rem"}}>{source}</span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>

            <a href={newsUrl} target="-blank" className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
  }


export default NewsItems
