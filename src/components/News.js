import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Loader from './Loader';
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {
    // articles = [
    //     {
    //         "source": {
    //             "id": "associated-press",
    //             "name": "Associated Press"
    //         },
    //         "author": "DASHA LITVINOVA",
    //         "title": "Over 400 detained in Russia as country mourns the death of Alexei Navalny, Putin's fiercest foe - The Associated Press",
    //         "description": "A prominent rights group says over 400 people have been detained in Russia while paying tribute to opposition leader Alexei Navalny, who died at a remote Arctic penal colony. The sudden death of the 47-year-old Navalny was a crushing blow to many Russians, wh…",
    //         "url": "https://apnews.com/article/russia-alexei-navalny-death-prison-putin-d0121f49840ee1cd6fbf94f6d7249e1b",
    //         "urlToImage": "https://dims.apnews.com/dims4/default/e07b0c6/2147483647/strip/true/crop/6000x3375+0+312/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fd2%2F3f%2F626de898f585c1d52eb45f57a5d3%2F70d0b1b9c58548599aeef03cf027417a",
    //         "publishedAt": "2024-02-18T09:30:00Z",
    //         "content": "Over 400 people were detained in Russia while paying tribute to opposition leader Alexei Navalny, who died at a remote Arctic penal colony, a prominent rights group reported. \r\nThe sudden death of Na… [+4256 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "the-washington-post",
    //             "name": "The Washington Post"
    //         },
    //         "author": "Ben Brasch",
    //         "title": "Texas Gov. Abbott builds new base at Eagle Pass amid fight with Biden - The Washington Post",
    //         "description": "The Texas base in Eagle Pass is expected to house up to 1,800 National Guard members as part of the state’s response to illegal border crossings.",
    //         "url": "https://www.washingtonpost.com/nation/2024/02/17/texas-abbott-new-base-border/",
    //         "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/QBKD7MQ7BIEQRXJ2BG3V47KW5I_size-normalized.jpg&w=1440",
    //         "publishedAt": "2024-02-18T04:46:06Z",
    //         "content": "Flanked by armed National Guard members, Texas Gov. Greg Abbott (R) announced on Friday plans to build a base housing up to 1,800 troops in Eagle Pass, close to the riverfront area where state leader… [+3929 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "abc-news",
    //             "name": "ABC News"
    //         },
    //         "author": "CLAUDIA LAUER Associated Press, JILL COLVIN Associated Press",
    //         "title": "Trump hawks $399 branded shoes at 'Sneaker Con,' a day after a $355 million ruling against him - ABC News",
    //         "description": "As he closes in on the Republican presidential nomination, former President Donald Trump made a highly unusual stop",
    //         "url": "https://abcnews.go.com/US/wireStory/trump-hawks-399-branded-shoes-sneaker-con-day-107321779",
    //         "urlToImage": "https://i.abcnewsfe.com/a/505d50bd-0b29-4030-b286-18e8c7e99b52/wirestory_4de093eda6f8d1c68baf8fe8095f777b_16x9.jpg?w=1600",
    //         "publishedAt": "2024-02-18T02:37:30Z",
    //         "content": "PHILADELPHIA -- As he closes in on the Republican presidential nomination, former President Donald Trump made a highly unusual stop Saturday, hawking new Trump-branded sneakers at Sneaker Con, a gath… [+5181 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "cbs-news",
    //             "name": "CBS News"
    //         },
    //         "author": "Peter Van Sant",
    //         "title": "How slain Las Vegas journalist Jeff German may have helped capture his own killer - CBS News",
    //         "description": "Crucial DNA evidence found under the fingernails of reporter Jeff German led investigators to Robert Telles, the man charged with killing him.",
    //         "url": "https://www.cbsnews.com/news/jeff-german-slain-las-vegas-journalist-robert-telles-arrest-dna-evidence/",
    //         "urlToImage": "https://assets2.cbsnewsstatic.com/hub/i/r/2022/09/06/0d9c1ab6-500a-4e04-b5d5-e33eaaea5f4f/thumbnail/1200x630g6/238e0eaaafc674122153c09bd7b779a2/gettyimages-1242951169.jpg?v=2a01790210e495d24a119503c08f840d",
    //         "publishedAt": "2024-02-18T04:21:00Z",
    //         "content": "Las Vegas Review-Journal investigative reporter Jeff German was a man who lived for his job. And as it turns out, may have died for it. In September 2022, he was stabbed to death by an assailant outs… [+35305 chars]"
    //     }
    // ]
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'      //default category is set here
    }
    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],       // articles: this.articles, this is used when only the above article is shown 
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=b80b4d5c4d3b4e2e96afb6f52792de40&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(70);
        let parsedData = await data.json()
        this.setState({                                  //"this.state" is used for updating the state
            articles: parsedData.articles,
            totalArticles: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    async componentDidMount() {           // This method is commonly used to perform tasks that need to happen after the component has been rendered for the first time.
        this.updateNews();
    }

    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=b80b4d5c4d3b4e2e96afb6f52792de40&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json()

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
        const nextPage = this.state.page + 1;
        const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=b80b4d5c4d3b4e2e96afb6f52792de40&page=${nextPage}&pageSize=${this.props.pageSize}`;
       
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(prevState => ({
            articles: [...prevState.articles, ...parsedData.articles],
            totalArticles: parsedData.totalResults,
            page: nextPage
        }));
    };

    render() {
        return (
            <>
                <h1 className="container text-center" style={{ margin: '32px' }}>
                    TOP {this.capitalizeFirstLetter(this.props.category)} - News HEADLINES
                </h1>
                {this.state.loading && <Loader />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loader />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {        //"loading" line is written here so that when page changes we are able to see loading 
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next  &raquo;</button>
                    </div> */}

            </>
        )
    }
}

export default News
