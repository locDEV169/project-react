import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import ErrorForm from "../../Error/formErrors";
import MenuLeft_Account from "../../Layout/MenuLeft_Account";
const SucecssStyle = {
  color:'greenyellow'
}
class Update extends Component {
    constructor(props) {
      super(props);
      this.state = {
          name: "",
          email: "",
          password: "",
          address: "",
          phone: "",
          avatar: "",
          file: "",
          level : 0,
          country:"",
          msg: "",
          formErrors: {},
      };
      this.handleValue = this.handleValue.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputFile = this.handleInputFile.bind(this);
    }
    
  handleValue(e) {
      let nameInput = e.target.name;  
      let value = e.target.value;
      this.setState({
        [nameInput]: value,
      });
      // console.log(value);
  }
  handleInputFile(e) {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        avatar: e.target.result,
        file: file[0],
      });
    };
    reader.readAsDataURL(file[0]);
  }
  componentDidMount() {
    // get data in localStorage
      const getInfo = localStorage.getItem("info");
      if (getInfo) {
        const convertInfo = JSON.parse(getInfo);
        console.log(convertInfo)
        //set data từ local vào biến
        this.setState({
          name: convertInfo.Auth.name,
          email: convertInfo.Auth.email,
          address: convertInfo.Auth.address,
          phone: convertInfo.Auth.phone,
          country: convertInfo.Auth.country,
          avatar: convertInfo.Auth.avatar,
        });
      } else {
        // return login if chuwa login
        this.props.history.push("/login");
      }
  }
  
  handleSubmit(e){
      e.preventDefault();
      // get data of localStorage
      const getInfo = localStorage.getItem("info");
      const convertInfo = JSON.parse(getInfo);
      let check = true;
      let { name, file, phone, address, country } = this.state;
      let errorsSubmit = this.state.formErrors;
      if (name == "") {
        check = false;
        errorsSubmit.name = "Vui lòng điền Name";
      } else {
        check = true;
        errorsSubmit.name = "";
      }
      if (phone == "") {
        check = false;
        errorsSubmit.phone = "Vui lòng điền Phone";
      } else {
        check = true;
        errorsSubmit.phone = "";
      }
      if (address == "") {
        check = false;
        errorsSubmit.address = "Vui lòng điền địa chỉ";
      } else {
        check = true;
        errorsSubmit.address = "";
      }
      if (country == "") {
        check = false;
        errorsSubmit.country = "Vui lòng điền Country";
      } else {
        check = true;
        errorsSubmit.country = "";
      }
      if(file == ''){
        check = false;
        errorsSubmit.file = "Vui lòng điền ava"
      }
      else{
          if(file.size > 1024*1024){
              check = false;
              errorsSubmit.file = "avatar tai len qua 1mb"
          }
          else {
             const typeImg = ["png", "jpg", "jpeg", "PNG", "JPG"] ;
             let res = file.name.split(".");
             if(!typeImg.includes(res[1])){
              errorsSubmit.file = "Vui lòng điền định dạng của ảnh"
             }
             else{
                check = true;
                errorsSubmit.file = "";
             }
          }
      }

      if(!check){
          this.setState({
              formErrors : errorsSubmit
          })
      }
      else{
          // lấy địa chỉ id từ user để chuyển qua cho Api
          const getIdUser = convertInfo.Auth.id;
          let url = "http://localhost:8080/laravel/public/api/user/update/" + getIdUser;
          const accessToken = convertInfo.success.token;
          let config = {
              headers: {
                  Authorization: "Bearer " + accessToken,
                  "Content-Type": "application/x-www-form-urlencoded",
                  Accept: "application/json",
              }
          }
          // tạo form data để truyền dữ liệu vào
          const formData = new FormData();
          formData.append("name", this.state.name);
          formData.append("email", convertInfo.Auth.email);
          formData.append("password", this.state.password);
          formData.append("phone", this.state.phone);
          formData.append("address", this.state.address);
          formData.append("country", this.state.country);
          formData.append("avatar", this.state.avatar);
          axios.post(url, formData, config)
          .then((res) => {
              console.log(res);
              console.log(res.data)
              if (res.data.errors) {
                this.setState({
                  formErrors: res.data.errors,
                });
              } else {
                const convert = JSON.stringify(res.data)
                localStorage.setItem("info",convert)
                this.setState({
                  msg: "update thanh cong ",
                });
            }
          })
          
          .catch(error => console.log(error));
      }
      
  }
  
  render() {
    return (
      
      <div className="col-sm-8 col-sm-offset-1">
        <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <MenuLeft_Account />
              </div>
              <div className="col-sm-5">
                <div className="login-form">
                    <h2>User Update</h2>
                    <p style={SucecssStyle}>{this.state.msg}</p>
                    <ErrorForm formErrors={this.state.formErrors} />
                    <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                      <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        placeholder="Name"
                        onChange={this.handleValue}
                      />
                      <input
                        type="text"
                        name="email"
                        readOnly='true'
                        value={this.state.email}
                        placeholder="Email Address"
                        onChange={this.handleValue}
                      />
                      <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.handleValue}
                      />
                      <input
                        type="text"
                        name="address"
                        value={this.state.address}
                        placeholder="Address"
                        onChange={this.handleValue}
                      />
                      <input
                        type="text"
                        name="country"
                        value={this.state.country}
                        placeholder="Country"
                        onChange={this.handleValue}
                      />
                      <input
                        type="text"
                        name="phone"
                        value={this.state.phone}
                        placeholder="Phone Number"
                        onChange={this.handleValue}
                      />
                      <input type="file" name="avatar" onChange={this.handleInputFile} />
                      <button
                        type="submit"
                        className="btn btn-default"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
            </div>
            
        </div>

        
      </div>
    );
  }
}
export default withRouter(Update);