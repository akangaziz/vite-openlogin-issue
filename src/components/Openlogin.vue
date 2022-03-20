<template>
  
    <div>
    <h1>test @toruslabs/openlogin with vite and vue3</h1>  
    <h2> mode: {{env.MODE}}</h2>
     
    
    <br>
    <hr>
    <button @click="login()">Button to OpenLogin Here</button>
    </div>
   
    
  
</template>

<script>
import OpenLogin from "@toruslabs/openlogin";
const openlogin = new OpenLogin({
        // your clientId aka projectId , get it from https://developer.tor.us
        // clientId is not required for localhost, you can set it to any string
        // for development
        clientId:
          "BMmDWQRghNfjbVj5i-m00exJ1WK26NdW_V5E3ByfoGAcoGKe6t863UxJ_kWG9kkPZj5Iy_4L9x2HxYHHyiiB4hk",
        network: "testnet",
        uxMode: "redirect",
        whiteLabel: {
          dark: true,
          theme: {
            primary: "#ffa500",
          },
        },
      });
        
export default {
  mounted() {
      
  },
  data: function () {
    return {
       env: import.meta.env,
    };
  },
  methods: {
    async login() {   
      console.log("call openlogin.init() ");
      await openlogin.init();     
      console.log("call openlogin.logout() ");
      await openlogin.logout({});
      try {
        console.log("try... ");
        // in popup mode (with third party cookies available) or if user is already logged in this function will
        // return priv key , in redirect mode or if third party cookies are blocked then priv key be injected to
        // sdk instance after calling init on redirect url page.

        console.log("call openlogin.login() ");
        const privKey = await openlogin.login({
          // pass empty string '' as loginProvider to open default torus modal
          // with all default supported login providers or you can pass specific
          // login provider from available list to set as default.
          // for ex: google, facebook, twitter etc
          loginProvider: "",
          redirectUrl: "/", //window.location.pathname,
          relogin: false,
          // setting it true will force user to use touchid/faceid (if available on device)
          // while doing login again
          fastLogin: true,
          // setting skipTKey to true will display a button to user to skip
          // openlogin security while login.
          // But caveat here is that user will be get different keys if user is skipping tkey
          // so use this option with care in your app or make sure user knows about this.
          skipTKey: false,
          // you can pass standard oauth parameter in extralogin options
          // for ex: in case of passwordless login, you have to pass user's email as login_hint
          // and your app domain.
          // extraLoginOptions: {
          //   domain: 'www.yourapp.com',
          //   login_hint: 'hello@yourapp.com',
          // },
        });
        //   console.log("privKey: ", privKey);
        if (privKey) {
          console.log("ini privKey: ", privKey);
        }
      } catch (error) {
        console.log("error", error);
        return error;
      }
    },
  },
};
</script>
