<template>
  <div class="login_text">
    <van-field :label="label"
               :placeholder="placeholder"
               :type="type"
               :rule="rule"
               v-model="content"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  props: ['label', 'placeholder', 'type', 'rule'],
  methods: {
    handleRule() {
      const reg = new RegExp(this.rule)
      if (reg.test(this.content)) {
        this.$emit('inputChange', this.content)
      }
    }
  },
  watch: {
    content () {
      this.handleRule()
    }
  }
}
</script>

<style scoped>

</style>
