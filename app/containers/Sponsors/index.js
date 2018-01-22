/*
 *
 * Sponsors
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';

import './style.css';
import './styleM.css';

const API = '';

export default class Sponsors extends React.PureComponent {

    // state = {
    //   sponsors: '',
    // };

    // componentDidMount() {
    //   this.getSponsors();
    // }
    // getSponsors = () => {
    //   fetch(`http://localhost:8000/api/sponsors`, {
    //     headers: { Authorization: `Bearer ${localStorage['token']}` }
    //   })
    //   .then(response => response.json())
    //   .then(Sponsors => {
    //     if (!Sponsors.error) {
    //       this.setState({	sponsors: Sponsors });
    //     }
    //   })
    //   .catch(error => {
    //     alert(`error in fetching data from server: ${error}`); // eslint-disable-line
    //   });
    // }

    render() {
        const cardHeaderStyle = {
            textAlign: 'center',
            padding: '15px'
        }


        return (
            <div className="container">
                <Helmet title="Sponsors" meta={[{ name: 'description', content: 'Description of Sponsors' }]} />
                <Header />

                <main>
                    <div className="sponsorBanner">
                        <h2>Our Sponsors</h2>
                        <p> How much we love our sponsors </p>
                    </div>


                    <div className="sponsorBody">
                        <div className="sponsorList">

                            <Card className="sponsorListing">
                                <CardMedia className="sponsorLogo">
                                    <img src="https://placeholdit.co//i/150x150" />
                                </CardMedia>

                                <CardHeader title="a company" style={cardHeaderStyle} />

                                <div className="sponsorTextBlock">
                                    <CardContent>
                                        <a className="sponsorSiteLink" href="/" > their website link </a>
                                    </CardContent>
                                </div>
                            </Card>
                            <Card className="sponsorListing">
                                <CardMedia className="sponsorLogo">
                                    <img src="https://placeholdit.co//i/150x150" />
                                </CardMedia>

                                <CardHeader title="a company" style={cardHeaderStyle} />

                                <div className="sponsorTextBlock">
                                    <CardContent>
                                        <a className="sponsorSiteLink" href="/" > their website link </a>
                                    </CardContent>
                                </div>
                            </Card>
                            <Card className="sponsorListing">
                                <CardMedia className="sponsorLogo">
                                    <img src="https://placeholdit.co//i/150x150" />
                                </CardMedia>

                                <CardHeader title="a company" style={cardHeaderStyle} />

                                <div className="sponsorTextBlock">
                                    <CardContent>
                                        <a className="sponsorSiteLink" href="/" > their website link </a>
                                    </CardContent>
                                </div>
                            </Card>
                            <Card className="sponsorListing">
                                <CardMedia className="sponsorLogo">
                                    <img src="https://placeholdit.co//i/150x150" />
                                </CardMedia>

                                <CardHeader title="a company" style={cardHeaderStyle} />

                                <div className="sponsorTextBlock">
                                    <CardContent>
                                        <a className="sponsorSiteLink" href="/" > their website link </a>
                                    </CardContent>
                                </div>
                            </Card>
                            <Card className="sponsorListing">
                                <CardMedia className="sponsorLogo">
                                    <img src="https://placeholdit.co//i/150x150" />
                                </CardMedia>

                                <CardHeader title="a company" style={cardHeaderStyle} />

                                <div className="sponsorTextBlock">
                                    <CardContent>
                                        <a className="sponsorSiteLink" href="/" > their website link </a>
                                    </CardContent>
                                </div>
                            </Card>
                            <Card className="sponsorListing">
                                <CardMedia className="sponsorLogo">
                                    <img src="https://placeholdit.co//i/150x150" />
                                </CardMedia>

                                <CardHeader title="a company" style={cardHeaderStyle} />

                                <div className="sponsorTextBlock">
                                    <CardContent>
                                        <a className="sponsorSiteLink" href="/" > their website link </a>
                                    </CardContent>
                                </div>
                            </Card>
                            <Card className="sponsorListing">
                                <CardMedia className="sponsorLogo">
                                    <img src="https://placeholdit.co//i/150x150" />
                                </CardMedia>

                                <CardHeader title="a company" style={cardHeaderStyle} />

                                <div className="sponsorTextBlock">
                                    <CardContent>
                                        <a className="sponsorSiteLink" href="/" > their website link </a>
                                    </CardContent>
                                </div>
                            </Card>
                            <Card className="sponsorListing">
                                <CardMedia className="sponsorLogo">
                                    <img src="https://placeholdit.co//i/150x150" />
                                </CardMedia>

                                <CardHeader title="a company" style={cardHeaderStyle} />

                                <div className="sponsorTextBlock">
                                    <CardContent>
                                        <a className="sponsorSiteLink" href="/" > their website link </a>
                                    </CardContent>
                                </div>
                            </Card>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }
}
