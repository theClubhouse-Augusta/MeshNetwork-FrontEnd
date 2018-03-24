/**
 *
 * SpaceInformation
 *
 */

import React from "react";
import Paper from "material-ui/Paper";
import { TextField } from "material-ui";
import Button from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";
import {
    EditorState,
    ContentState,
    convertToRaw,
    // convertFromRaw,
    convertFromHTML
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./style.css";
import "./styleM.css";


export default class SpaceInformation extends React.PureComponent {
    state = {
        token: localStorage.getItem("token"),
        msg: "",
        snack: false,
        id: "",
        name: "",
        email: "",
        website: "",
        phone_number: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        stripe: "",
        pubKey: "",
        facebook: "",
        twitter: "",
        instagram: "",
        logo: "",
        logoPreview: "",
        description: ""
    };

    spaceUpdateAPI = `https://innovationmesh.com/api/workspaces/${this.props.spaceID}`;

    handleRequestClose = () => {
        this.setState({ snack: false, msg: "" });
    };
    showSnack = msg => {
        this.setState({ snack: true, msg: msg });
    };

    componentWillMount() {
        this.getSpaceInfo();
    }

    handleInputChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    onEditorChange = editorState => {
        this.setState({ description: editorState });
    };

    handleLogo = event => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                logo: file,
                logoPreview: reader.result
            });
        };
        reader.readAsDataURL(file);
    };

    getSpaceInfo = () => {
        fetch("https://innovationmesh.com/api/workspace/" + this.props.id, {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => {
                this.setState(
                    {
                        id: json.id,
                        name: json.name,
                        email: json.email,
                        website: json.website,
                        phone_number: json.phone_number,
                        address: json.address,
                        city: json.city,
                        state: json.state,
                        zipcode: json.zipcode,
                        logo: json.logo,
                        description: EditorState.createWithContent(
                            ContentState.createFromBlockArray(
                                convertFromHTML(json.description)
                            )
                        ),
                        facebook: json.facebook,
                        twitter: json.twitter,
                        instagram: json.instagram,
                        stripe: json.stripe,
                        pubKey: json.pubKey
                    }
                );
            });
    };

    renderLogoPreview = () => {
        if (this.state.logoPreview === "") {
            return <img alt="" src={this.state.logo} className="spaceIDashLogoPreview" />;
        } else if (this.state.logo !== this.state.logoPreview) {
            return (
                <img alt="" src={this.state.logoPreview} className="spaceIDashLogoPreview" />
            );
        }
    };

    spaceInfoSubmit = () => {
        let data = new FormData();
        let {
            id,
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
            stride,
            pubKey,
            logo
    } = this.state;

        data.append("spaceID", id);
        data.append("name", name);
        data.append("city", city);
        data.append("address", address);
        data.append("state", state);
        data.append("zipcode", zipcode);
        data.append("email", email);
        data.append("website", website);
        data.append("phone_number", phone_number);
        data.append(
            "description",
            draftToHtml(convertToRaw(description.getCurrentContent()))
        );
        data.append("facebook", facebook);
        data.append("twitter", twitter);
        data.append("instagram", instagram);
        data.append("logo", logo);
        data.append("stride", stride);
        data.append("pubKey", pubKey);
        data.append("_method", "PATCH");

        fetch(this.spaceUpdateAPI, {
            method: "post",
            body: data,
            headers: { Authorization: "Bearer " + this.state.token }
        })
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    this.showSnack(json.error);
                } else if (json.success) {
                    this.showSnack(json.success);
                }
            });
    };

    render() {
        // const { contentState } = this.state;

        return (
            <div className="spaceInfoDash">
                <Paper>
                    <div className="spaceIDashHeader">
                        {/* <h2 /> */}
                    </div>
                    <div className="spaceIDashMain">
                        <form className="spaceIDashForm">
                            <div className="spaceIDashInfoMain">
                                <div className="spaceIDashContactInfo">
                                    <div className="spaceFormItem">
                                        <TextField
                                            label="Space Name"
                                            margin="normal"
                                            value={`${this.state.name}`}
                                            placeholder={`${this.state.name}`}
                                            onChange={this.handleInputChange("name")}
                                            style={{ width: "80%" }}
                                        />
                                    </div>

                                    <div className="spaceIDashContactDet">
                                        <div className="spaceFormItem">
                                            <TextField
                                                label={"Email"}
                                                margin="normal"
                                                value={`${this.state.email}`}
                                                placeholder={`${this.state.email}`}
                                                onChange={this.handleInputChange("email")}
                                                style={{ width: "80%" }}
                                            />
                                        </div>
                                        <div className="spaceFormItem">
                                            <TextField
                                                label={"Website"}
                                                margin="normal"
                                                value={`${this.state.website}`}
                                                placeholder={`${this.state.website}`}
                                                onChange={this.handleInputChange("website")}
                                                style={{ width: "80%" }}
                                            />
                                        </div>
                                        <div className="spaceFormItem">
                                            <TextField
                                                label={"Phone"}
                                                margin="normal"
                                                value={`${this.state.phone_number}`}
                                                placeholder={`${this.state.phone_number}`}
                                                onChange={this.handleInputChange("phone_number")}
                                            />
                                        </div>
                                    </div>

                                    <div className="spaceIDashLocation">
                                        <TextField
                                            label={"Address"}
                                            margin="normal"
                                            value={`${this.state.address}`}
                                            placeholder={`${this.state.address}`}
                                            onChange={this.handleInputChange("address")}
                                        />

                                        <div className="spaceIDashAdd">
                                            <TextField
                                                label={"City"}
                                                margin="normal"
                                                value={`${this.state.city}`}
                                                placeholder={`${this.state.city}`}
                                                style={{ maxWidth: "120px" }}
                                                onChange={this.handleInputChange("city")}
                                            />

                                            <TextField
                                                label={"State"}
                                                margin="normal"
                                                value={this.state.state}
                                                placeholder={this.state.state}
                                                style={{ maxWidth: "50px" }}
                                                onChange={this.handleInputChange("state")}
                                            />

                                            <TextField
                                                label={"Zipcode"}
                                                margin="normal"
                                                value={this.state.zipcode}
                                                placeholder={this.state.zipcode}
                                                style={{ maxWidth: "100px" }}
                                                onChange={this.handleInputChange("zipcode")}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className="spaceIDashPaymentInfo"
                                        style={{ padding: "15px 0" }}
                                    >
                                        <h3> Payment System </h3>
                                        <TextField
                                            label={"Stripe Private Key"}
                                            margin="normal"
                                            placeholder={this.state.stripeKey}
                                            defaultValue={this.state.stripeKey}
                                            onChange={this.handleInputChange("stripeKey")}
                                        />
                                        <TextField
                                            label={"Stripe Public Key"}
                                            margin="normal"
                                            placeholder={this.state.pubKey}
                                            defaultValue={this.state.pubKey}
                                            onChange={this.handleInputChange("pubKey")}
                                        />
                                    </div>
                                </div>

                                <div className="spaceIDashLogo">
                                    <h3 style={{ margin: "15px 0" }}> Logo </h3>
                                    <div className="spaceIDashLogoPreview">
                                        {this.renderLogoPreview()}
                                    </div>

                                    <div>
                                        <label style={{ display: "flex", flexDirection: "column" }}>
                                            <Button raised component="span">
                                                Upload
                        <input
                                                    onChange={this.handleLogo}
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    accept="image/*"
                                                />
                                            </Button>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="spaceIDashSocialForm">
                                <h3 style={{ margin: "15px 0" }}>Social Media Handles</h3>
                                <div className="spaceIDashSocialMedia">
                                    <TextField
                                        label={"Facebook"}
                                        margin="normal"
                                        value={this.state.facebook}
                                        placeholder={this.state.facebook}
                                        onChange={this.handleInputChange("facebook")}
                                    />
                                    <TextField
                                        label={"Twitter"}
                                        margin="normal"
                                        value={this.state.twitter}
                                        placeholder={this.state.twitter}
                                        onChange={this.handleInputChange("twitter")}
                                    />
                                    <TextField
                                        label={"Instagram"}
                                        margin="normal"
                                        value={this.state.instagram}
                                        placeholder={this.state.instagram}
                                        onChange={this.handleInputChange("instagram")}
                                    />
                                </div>
                            </div>
                        </form>

                        <div className="spaceIDashDescription">
                            <h3 style={{ margin: "15px 0" }}>Description</h3>
                            <Paper>
                                <Editor
                                    editorState={this.state.description}
                                    onEditorStateChange={this.onEditorChange}
                                    // toolbarClassName="home-toolbar"
                                    // wrapperClassName="home-wrapper"
                                    // editorClassName="rdw-editor-main"
                                    editorStyle={{ padding: "0 .5em" }}
                                    toolbar={{
                                        inline: { inDropdown: true },
                                        fontSize: { className: "toolbarHidden" },
                                        fontFamily: { className: "toolbarHidden" },
                                        textAlign: {
                                            inDropdown: true,
                                            options: ["left", "center", "right"]
                                        },
                                        link: { inDropdown: true },
                                        remove: { className: "toolbarHidden" },
                                        emoji: { className: "toolbarHidden" },
                                        history: { className: "toolbarHidden" }
                                    }}
                                />
                            </Paper>
                        </div>
                        <div className="spaceIDashSubmit">
                            <Button
                                raised
                                style={{
                                    backgroundColor: "#ff4d58",
                                    padding: "10px",
                                    marginTop: "15px",
                                    color: "#FFFFFF",
                                    width: "50%"
                                }}
                                onClick={this.spaceInfoSubmit}
                            >
                                Submit
              </Button>
                        </div>
                    </div>
                </Paper>
                <Snackbar
                    open={this.state.snack}
                    message={this.state.msg}
                    autoHideDuration={3000}
                    onClose={this.handleRequestClose}
                />
            </div>
        );
    }
}
