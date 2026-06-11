import Modal from 'bootstrap/js/dist/modal';
export default {
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    }
  },
  mounted() {
    console.log('Mounted modalMixin');
    console.log('modal ref:', this.$refs.modal);
    this.modal = new Modal(this.$refs.modal);
  }
}