/**
*
* SpaceInformation
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { TextField } from 'material-ui';
import Button from 'material-ui/Button';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import './style.css';
import './styleM.css';



const spaceUpdateAPI = 'https://innovationmesh.com/api/spaceupdate';


export default class SpaceInformation extends React.PureComponent {
    state = {
        name: '',
        email: '',
        website: '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        stripeKey: '',
        pubKey: '',
        facebook: '',
        twitter: '',
        instagram: '',

        logo: '',
        logoPreview: '',

        description: '',
        //editorState:EditorState.createWithContent(ContentState.convertFromRaw(this.props.description)),

    }

    componentWillMount() {
        this.getSpaceInfo();
    }

    handleInputChange = name => event => {
        this.setState({
            [name]: event.target.value,
        }, function () {
            console.log(this.state);
        });
    };

    onEditorChange = (editorState) => {
        this.setState({ editorState });
    }

    handleLogo = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                logo: file,
                logoPreview: reader.result,
            })
        }
        reader.readAsDataURL(file);
        console.log(this.state.logoPreview);
    }

    getSpaceInfo = () => {
        fetch('https://innovationmesh.com/api/workspace/' + this.props.id, {
            method: 'GET'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    name: json.name,
                    email: json.email,
                    website: json.website,
                    phone_number: json.phone_number,
                    address: json.address,
                    city: json.city,
                    state: json.state,
                    zipcode: json.zipcode,
                    logo: json.logo,
                    description: json.description,
                    facebook: json.facebook,
                    twitter: json.twitter,
                    instagram: json.instagram,
                    stripe: json.stripe,
                    payURL: json.payURL,
                }, function () {
                    console.log(this.state);
                })
            }
                .bind(this))
    }



    renderLogoPreview = () => {
        if (this.state.logoPreview == '') {
            return (
                <img src={this.state.logo} className="spaceIDashLogoPreview" />
            )
        }
        else (this.state.logo !== this.state.logoPreview); {
            return (
                <img src={this.state.logoPreview} className="spaceIDashLogoPreview" />
            )
        }
    }




    spaceInfoSubmit = () => {
        let data = new FormData();
        let {
    name,
            city,
            address,
            state,
            zipcode,
            email,
            website,
            phone_number,
            description,
            facebook,
            twitter,
            instagram,
            pinterest,
            youtube,
            tumblr,
            logo
   } = this.state;

        data.append('name', name.trim());
        data.append('city', city.trim());
        data.append('address', address.trim());
        data.append('state', state.trim());
        //data.append('zipcode', zipcode.trim());
        data.append('email', email.trim());
        data.append('website', website.trim());
        data.append('phone_number', phone_number.trim());
        //data.append('description', );
        data.append('facebook', facebook);
        //data.append('twitter', twitter.trim());
        //data.append('instagram', instagram.trim());
        //data.append('pinterest', pinterest.trim());
        //data.append('youtube', youtube.trim());
        //data.append('tumblr', tumblr.trim());
        //data.append('logo', this.state. logo);

        fetch(spaceUpdateAPI, {
            //header?
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        const { contentState } = this.state;

        return (
            <div className="spaceInfoDash">
                <Paper>
                    <div className="spaceIDashHeader">
                        <h2></h2>
                    </div>
                    <div className="spaceIDashMain">
                        <form className="spaceIDashForm">

                            {/* INPUTS FYI- if you turn them back into a regular exp it bugs the floating label pls avoid */}

                            <div className="spaceIDashInfoMain">
                                <div className="spaceIDashContactInfo">
                                    <p className="spaceFormItem">
                                        <TextField
                                            label='Space Name'
                                            margin='normal'
                                            value={`${this.state.name}`}
                                            placeholder={`${this.state.name}`}
                                            onChange={this.handleInputChange('name')}
                                            style={{ width: '80%' }}
                                        />

                                    </p>

                                    <div className="spaceIDashContactDet">
                                        <p className="spaceFormItem">
                                            <TextField
                                                label={'Email'}
                                                margin='normal'
                                                value={`${this.state.email}`}
                                                placeholder={`${this.state.email}`} onChange={this.handleInputChange('email')}
                                                style={{ width: '80%' }}
                                            />
                                        </p>
                                        <p className="spaceFormItem">
                                            <TextField
                                                label={'Website'}
                                                margin='normal'
                                                value={`${this.state.website}`}
                                                placeholder={`${this.state.website}`}
                                                onChange={this.handleInputChange('website')}
                                                style={{ width: '80%' }}
                                            />
                                        </p>
                                        <p className="spaceFormItem">
                                            <TextField
                                                label={'Phone'}
                                                margin='normal'
                                                value={`${this.state.phone_number}`}
                                                placeholder={`${this.state.phone_number}`} onChange={this.handleInputChange('phone_number')}
                                            />
                                        </p>
                                    </div>


                                    <div className="spaceIDashLocation">
                                        <TextField
                                            label={'Address'}
                                            margin='normal'
                                            value={`${this.state.address}`}
                                            placeholder={`${this.state.address}`} onChange={this.handleInputChange('address')}
                                        />

                                        <div className="spaceIDashAdd">
                                            <TextField
                                                label={'City'}
                                                margin='normal'
                                                value={`${this.state.city}`}
                                                placeholder={`${this.state.city}`}
                                                style={{ maxWidth: '120px' }}
                                                onChange={this.handleInputChange('city')}
                                            />

                                            <TextField
                                                label={'State'}
                                                margin='normal'
                                                value={`${this.state.state}`}
                                                placeholder={`${this.state.state}`}
                                                style={{ maxWidth: '50px' }}
                                                onChange={this.handleInputChange('state')}
                                            />

                                            <TextField
                                                label={'Zipcode'}
                                                margin='normal'
                                                value={`${this.state.zipcode}`}
                                                placeholder={`${this.state.zipcode}`}
                                                style={{ maxWidth: '100px' }}
                                                onChange={this.handleInputChange('zipcode')}
                                            />
                                        </div>
                                    </div>

                                    <div className="spaceIDashPaymentInfo" style={{ padding: '15px 0' }}>
                                        <h3 > Payment System </h3>
                                        <TextField
                                            label={'Stripe API Key'}
                                            margin='normal'
                                        //placeholder={this.state.stripeKey }
                                        //defaultValue={this.state.stripeKey }
                                        //onChange={this.handleInputChange('stripeKey')}
                                        />
                                        <TextField
                                            label={'Outside Payment URL'}
                                            margin='normal'
                                        //placeholder={this.state.payURL}
                                        //defaultValue={this.state.payURL}
                                        //onChange={this.handleInputChange('payURL')}
                                        />
                                    </div>


                                </div>


                                <div className="spaceIDashLogo">

                                    <h3 style={{ margin: '15px 0' }}> Logo </h3>
                                    <div className="spaceIDashLogoPreview">
                                        {this.renderLogoPreview()}
                                    </div>

                                    <div>
                                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Button raised component="span" >
                                                Upload
                            <input
                                                    onChange={this.handleLogo}
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    accept="image/png, image/jpg, image/jpeg"
                                                />
                                            </Button>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="spaceIDashSocialForm">
                                <h3 style={{ margin: '15px 0' }}>Social Media Handles</h3>
                                <div className="spaceIDashSocialMedia">
                                    <TextField
                                        label={'Facebook'}
                                        margin='normal'
                                        value={`${this.state.facebook}`}
                                        placeholder={`${this.state.facebook}`}
                                        onChange={this.handleInputChange('facebook')}
                                    />
                                    <TextField
                                        label={'Twitter'}
                                        margin='normal'
                                        value={`${this.state.twitter}`}
                                        placeholder={`${this.state.twitter}`}
                                        onChange={this.handleInputChange('twitter')}
                                    />
                                    <TextField
                                        label={'Instagram'}
                                        margin='normal'
                                        value={`${this.state.instagram}`}
                                        placeholder={`${this.state.instagram}`}
                                        onChange={this.handleInputChange('instagram')}
                                    />
                                </div>

                            </div>
                        </form>


                        <div className="spaceIDashDescription">
                            <h3 style={{ margin: '15px 0' }}>Description</h3>
                            <Paper>
                                <Editor
                                    editorState={contentState}
                                    onEditorStateChange={this.onEditorChange}
                                    // toolbarClassName="home-toolbar"
                                    // wrapperClassName="home-wrapper"
                                    // editorClassName="rdw-editor-main"
                                    editorStyle={{ padding: '0 .5em' }}
                                    toolbar={{
                                        inline: { inDropdown: true },
                                        fontSize: { className: 'toolbarHidden' },
                                        fontFamily: { className: 'toolbarHidden' },
                                        list: { className: 'toolbarHidden' },
                                        textAlign: { inDropdown: true, options: ['left', 'center', 'right'] },
                                        link: { inDropdown: true },
                                        remove: { className: 'toolbarHidden' },
                                        emoji: { className: 'toolbarHidden' },
                                        history: { className: 'toolbarHidden' },
                                    }}
                                />
                            </Paper>
                        </div>
                        <div className="spaceIDashSubmit">
                            <Button
                                raised
                                style={{ backgroundColor: '#3399cc', padding: '15px', marginTop: '15px', color: '#FFFFFF', width: '50%' }}
                                onClick={this.spaceInfoSubmit}
                            >
                                Submit
                    </Button>
                        </div>
                    </div>
                </Paper>

            </div>
        );
    }
}

SpaceInformation.contextTypes = {
    router: PropTypes.object
};
