
window.addEventListener('load', () => {

    const app = Vue.createApp({
        data() {
            return {
                users: [],
                user: {
                    ImagePriduct: '',
                    id: '',
                    TitleProduct: '',
                    DescriptionProduct: '',
                    PriceProduct: ''
                },
                operation: "Registrar",
                userIndex: -1
            }
        },
        created() {
            if (localStorage.getItem('vue3.users') !== null) {
                this.users = JSON.parse(localStorage.getItem('vue3.users'));
            } else {
                this.listUsers();
            }
        },
        mounted() {
            this.$refs.TitleProduct.focus();
        },
        methods: {
            listUsers: async function () {
                const res = await fetch('https://run.mocky.io/v3/cd607f3e-e53b-4b89-9cca-6abc2ddeb122');
                const data = await res.json();
                this.users = data.slice(0, 40);
                this.updateLocalStorage();
            },
            updateLocalStorage: function () {
                localStorage.setItem('vue3.users', JSON.stringify(this.users));
            },
            processUser: function (event) {
                event.preventDefault();
                if (this.operation === "Registrar") {
                    this.user.id = this.findMaxId() + 1;
                    this.users.push({
                        id: this.user.id,
                        ImagePriduct: this.user.ImagePriduct,
                        TitleProduct: this.user.TitleProduct,
                        DescriptionProduct: this.DescriptionProduct,
                        PriceProduct: this.user.PriceProduct
                    });
                } else {
                    this.users[this.userIndex].ImagePriduct = this.user.ImagePriduct;
                    this.users[this.userIndex].TitleProduct = this.user.TitleProduct;
                    this.users[this.userIndex].DescriptionProduct = this.user.DescriptionProduct;
                    this.users[this.userIndex].PriceProduct = this.user.PriceProduct;
                }
                this.updateLocalStorage();
                this.findMaxId();
                this.clearFields();
            },
            findMaxId: function () {
                const maxId = Math.max.apply(Math, this.users.map(function (user) {
                    return user.id;
                }));
                return maxId;
            },
            editUser(id) {
                this.operation = "Editar";
                const userFound = this.users.find((user, index) => {
                    this.userIndex = index;
                    return user.id === id;
                });
                this.user.ImagePriduct = userFound.ImagePriduct;
                this.user.TitleProduct = userFound.TitleProduct;
                this.user.DescriptionProduct = userFound.DescriptionProduct;
                this.user.PriceProduct = userFound.PriceProduct;
            },
            deleteUser: function (id, event) {
                const confirmation = confirm('¿Esta seguro de eliminar el producto?');
                if (confirmation) {
                    this.users = this.users.filter(user => user.id !== id);
                    this.updateLocalStorage();
                } else {
                    event.preventDefault();
                }
            },
            clearFields: function () {
                this.user.id = "";
                this.user.ImagePriduct = "";
                this.user.TitleProduct = "";
                this.user.DescriptionProduct = "";
                this.user.PriceProduct = "";
                this.operation = "Registrar";
                this.$refs.TitleProduct.focus();
            }
        }
    });

    app.mount('#app');

});