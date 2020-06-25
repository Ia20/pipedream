//const github = require("https://github.com/PipedreamHQ/pipedream/components/github/github.app.js");
const github = require("./github.app.js");

module.exports = {
  name: "New Commits",
  description: "Triggers on new commits.",
  version: "0.0.1",
  props: {
    db: "$.service.db",
    github,
    repoFullName: { propDefinition: [github, "repoFullName"] },
    timer: {
      type: "$.interface.timer",
      default: {
        intervalSeconds: 60 * 5,
      },
    },
  },
  dedupe: "last",
  async run(event) {
    const commits = await this.github.getCommits({
      repoFullName: this.repoFullName,
    })
    commits.reverse().forEach(commit => {
      this.$emit(commit, {
        summary: commit.commit.message,
        id: commit.sha
      })
    })
  },
};