<script>
  const store = require("../store/store.js").store;

  exports = {
    props: ["comment"],
    data() {
      return {
        open: true
      }
    },
    methods: {
      toggle: function() {
        this.set("open", !this.get("open"));
      },
    },
    store: store
  };
</script>