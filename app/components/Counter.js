module.exports = {
  data() {
    return {
      count: 42,
      news: []
    };
  },
  mounted() {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Fnews%2Frss%3Fned%3Dus%26gl%3DUS%26hl%3Den").then(response => response.json()).then(news => {
      this.news = news.items;
    }).catch(e => {});
  },
  methods: {
    openClick() {}
  },
  template: `
    <StackLayout>
      <FlexboxLayout flexDirection="row" justifyContent="center">
        <Button @tap="decrement" text="-" class="btn btn-outline"/>
        <Label :text="count" alignSelf="baseline" class="h2"/>
        <Button @tap="increment" text="+" class="btn btn-outline"/>
      </FlexboxLayout>
      
      <ListView for="item in news" @itemTap="openClick">
        <v-template>
          <Label :text="item.title" />
        </v-template>
      </ListView>
    </StackLayout>
  `,
  methods: {
    increment() {
      this.count += 1;
    },
    decrement() {
      this.count -= 1;
    },
  },
};
