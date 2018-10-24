<template>
  <main>
    <div>
      <div class="two-cols">
        <div>
          <div>{{time}}</div>
        </div>
        <div>
          <div>{{weather}}</div>
        </div>
      </div>
    </div>
    <router-link to="/location">
      <div>
        <div><font-awesome-icon icon="location-arrow" /></div>
        <div>My location</div>
      </div>
    </router-link>
    <router-link to="/objects">
      <div>
        <div><font-awesome-icon icon="cubes" /></div>
        <div>Describe objects</div>
      </div>
    </router-link>
    <router-link to="/magnifier">
      <div>
        <div><font-awesome-icon icon="search-plus" /></div>
        <div>Magnifier</div>
      </div>
    </router-link>
  </main>
</template>

<script>
export default {
  data: () => {
    return {
      time: "Loading...",
      weather: "Loading..."
    }
  },
  mounted() {
    this.updateTime();
    this.updateWeather();
    setInterval(() => this.updateTime(), 1000);
    setInterval(() => this.updateWeather(), 600000);
  },
  methods: {
    updateTime() {
      const date = new Date();
      let hours = date.getHours();
      hours = hours < 10 ? "0" + hours : hours;
      let minutes = date.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;
      this.time = hours + ":" + minutes;
    },
    updateWeather() {
      if (navigator.geolocation) {
        if (localStorage.weather) {
          const weather = JSON.parse(localStorage.weather);
          if (weather.when > new Date().getTime() - 1000 * 60 * 10) {
            return this.weather = weather.info;
          }
        }
        navigator.geolocation.getCurrentPosition(position => {
          fetch(`https://platform.oswaldlabs.com/v1/weather/${position.coords.latitude}/${position.coords.longitude}`)
            .then(response => response.json())
            .then(json => {
              this.weather = json.weather[0].main;
              localStorage.setItem("weather", JSON.stringify({
                when: new Date().getTime(),
                info: json.weather[0].main
              }));
            })
            .catch(e => {});
        });
      }
    }
  }
}
</script>


<style lang="scss" scoped>
main {
  position: absolute;
  left: 0; right: 0;
  top: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  > * {
    height: 100%;
    border: none;
    padding: 0;
    margin: 0;
    text-decoration: none;
    display: inline-block;
    font: inherit;
    font-size: 4vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    &:nth-child(1) { background: #231463 }
    &:nth-child(2) { background: #270680 }
    &:nth-child(3) { background: #332295 }
    &:nth-child(4) { background: #3a2ea1 }
    &:nth-child(5) { background: #4339ad }
    &:nth-child(6) { background: #4842b7 }
    &:nth-child(7) { background: #6261c2 }
    &:focus {
      outline: none;
      box-shadow: inset 0 0 100vw rgba(0, 0, 0, 0.75);
    }
    > div {
      display: flex;
      &:first-child svg {
        margin-right: 1rem;
        font-size: 5vh;
      }
      &:last-child {
        display: flex;
        align-items: center;
      }
    }
  }
  .two-cols {
    width: 100%;
    font-size: 3vh;
    display: flex;
    > * {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
