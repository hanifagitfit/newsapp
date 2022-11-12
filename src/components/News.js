import React, { Component } from 'react'
import NewsItems from './NewsItems'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 7,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.props.category} -Dailyunt`
  }
  async newsUpdate() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.newsUpdate()

  }
  handlaPrevious = async () => {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47a7caeca4934c4b9ede9ebc03711de7&page=${this.state.page -1} &pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data=await fetch(url);
    // let parsedData= await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page:this.state.page -1,
    //   loading:false
    // }
    // )
    this.setState({ page: this.state.page - 1 })
    this.newsUpdate()
  }
  handleNext = async () => {
    console.log('next');
    // if(!(this.state.page+1> Math.ceil(this.state.totalResults/20))){
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47a7caeca4934c4b9ede9ebc03711de7&page=${this.state.page +1}&pageSize=${this.props.pageSize} `;
    // this.setState({loading:true});
    // let data=await fetch(url);
    // let parsedData= await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page:this.state.page +1,
    //   articles:parsedData.articles,
    //   loading:false
    // }
    // )
    // }
    this.setState({ page: this.state.page + 1 })
    this.newsUpdate()

  }
  fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
      })
  };
  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: "45px 0px", marginTop:"80px"}}>DailyHunt-  Top {this.props.category} Headlines</h2>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-4">
              {this.state.articles.map((element) => {

                return <div className="col-md-4" key={element.url}>
                  <NewsItems title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
     
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-sm btn-primary" onClick={this.handlaPrevious}> &larr;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-sm btn-primary" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      
       </>
    )
  }
}

export default News
