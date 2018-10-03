const geolocation = require("nativescript-geolocation");
const Counter = require('./Counter');

module.exports = {
  data() {
    return {
      loading: false,
      answer: ""
    };
  },
  methods: {
    location() {
      this.loading = true;
      geolocation.enableLocationRequest();
      geolocation.getCurrentLocation({ desiredAccuracy: "Accuracy.high", maximumAge: 5000, timeout: 20000 }).then(r => {
        fetch(`https://platform.oswaldlabs.com/geocode/${r.latitude}/${r.longitude}`).then(r => r.json()).then(r => {
        this.loading = false;
        if (r.results.length) {
          this.answer = r.results[0].formatted_address;
        } else {
          this.answer = "An error occurred in finding your location";
        }
      });
      }).catch(() => {
        this.answer = "An error occurred in finding your GPS location";
      })
    }
  },
  template: `
    <Page class="page">
      <ActionBar class="action-bar" title="Visib11y" />
  
      <StackLayout>
      
        <Label class="p-20" textWrap=true text="Click on the button below to find out your current location." />
      
        <Button class="btn btn-primary" @tap="location" text="Where am I?" />
        
        <Label class="p-20" textWrap=true :text="loading ? 'Loading...' : answer" />
      </StackLayout>
    </Page>
  `,
  components: {
    Counter,
  },
};
