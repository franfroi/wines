System.register("Model", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model;
    return {
        setters: [],
        execute: function () {
            Model = class Model {
                constructor(id) {
                    this.id = id;
                }
                getId() {
                    return this.id;
                }
                get$Dom() {
                    return this.$dom;
                }
                setID(id) {
                    this.id = id;
                }
            };
            exports_1("Model", Model);
        }
    };
});
System.register("Category", ["Model"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Model_1, Category;
    return {
        setters: [
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }
        ],
        execute: function () {
            Category = class Category extends Model_1.Model {
                constructor(id, name) {
                    super(id);
                    this.name = name;
                }
                getName() {
                    return this.name;
                }
                display($parent) {
                    // console.log(this.name);
                    // let id:number =  this.id;
                    let div = "<div class=' container-cat " + this.name + " ' data-category='" + this.id + "'>" + this.name + "";
                    div += "<br><img src='img/vin.png' class='boutVin'></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_2("Category", Category);
        }
    };
});
System.register("Product", ["Model"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Model_2, Product;
    return {
        setters: [
            function (Model_2_1) {
                Model_2 = Model_2_1;
            }
        ],
        execute: function () {
            Product = class Product extends Model_2.Model {
                constructor(id, name, prix, category) {
                    super(id);
                    this.name = name;
                    this.prix = prix;
                    this.category = category;
                }
                getCategory() {
                    return this.category;
                }
                display(parent) {
                    // let category_name:string = this.category.getName();
                    // let id:string =  category_name + this.id;
                    // let data_id: number = this.id;
                    let div = "<div id='" + this.id + "' class='item " + this.category + "'  data-product=" + this.id + " >" + this.id + " " + this.name + "</div>";
                    this.$dom = $(div);
                    parent.append(this.$dom);
                }
                displayoneProduct(parent) {
                    console.log(this.prix);
                    let div = "<div id='" + this.id + "'  data-product=" + this.id + " > " + this.name + "";
                    div += "<br><h1>" + this.prix + " €</h1></div>";
                    parent.html("");
                    this.$dom = $(div);
                    parent.show();
                    parent.append(this.$dom);
                }
            };
            exports_3("Product", Product);
        }
    };
});
System.register("Vendor", ["Model"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Model_3, Vendor;
    return {
        setters: [
            function (Model_3_1) {
                Model_3 = Model_3_1;
            }
        ],
        execute: function () {
            Vendor = class Vendor extends Model_3.Model {
                constructor(name, password) {
                    super(0); //id = 0 en super
                    this.name = name;
                    this.password = password;
                    //this.products = products;
                }
                getName() {
                    return this.name;
                }
                getPassword() {
                    return this.password;
                }
                removeProductById(id) {
                    for (let key in this.products) {
                        let product = this.products[key];
                        if (product.getId() == id) {
                            let nkey = parseInt(key);
                            this.products.slice(nkey, 1);
                            return;
                        }
                    }
                }
                getProducts() {
                    return this.products;
                }
                addProduct(product) {
                    this.products.push(product);
                }
                removeProduct(product) {
                    for (let key in this.products) {
                        let vproduct = this.products[key];
                        if (vproduct.getId() == product.getId()) {
                            this.products.splice(parseInt(key), 1);
                        }
                        return;
                    }
                }
                display($parent) {
                    let div = "<div class='vendor' id='vendor" + this.id + "' data-vendor='" + this.id + "' >";
                    div += "<a href='detail'>";
                    div += this.name + "</a></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_4("Vendor", Vendor);
        }
    };
});
System.register("APIService", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var APIService;
    return {
        setters: [],
        execute: function () {
            APIService = class APIService {
                constructor() {
                    this.url = "http://localhost/ProjetVin/API/";
                }
                static getService() {
                    if (!APIService.instance)
                        APIService.instance = new APIService();
                    return APIService.instance;
                }
                getVendor($vendor) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "vendor",
                            method: "POST",
                            dataType: "json",
                            data: {
                                name: $vendor.getName(),
                                password: $vendor.getPassword(),
                            },
                            success: (vendor) => {
                                resolve(vendor);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                Getall($vendor) {
                    return new Promise((resolve, reject) => {
                        console.log($vendor);
                        $.ajax({
                            url: this.url + "vendorCat",
                            method: "POST",
                            dataType: "json",
                            data: {
                                vendorId: $vendor.getId(),
                            },
                            success: (vendor) => {
                                resolve(vendor);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                GetProduct(idCat, idVend) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "ProduitByCat",
                            method: "POST",
                            dataType: "json",
                            data: {
                                catId: idCat,
                                vendId: idVend
                            },
                            success: (catProd) => {
                                resolve(catProd);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                GetoneProduct(data) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "ProduitByid",
                            method: "POST",
                            dataType: "json",
                            data: {
                                productID: data,
                            },
                            success: (productID) => {
                                resolve(productID);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
            };
            APIService.instance = null;
            exports_5("APIService", APIService);
        }
    };
});
System.register("App", ["Product", "Category", "Vendor", "APIService"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Product_1, Category_1, Vendor_1, APIService_1, App;
    return {
        setters: [
            function (Product_1_1) {
                Product_1 = Product_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (Vendor_1_1) {
                Vendor_1 = Vendor_1_1;
            },
            function (APIService_1_1) {
                APIService_1 = APIService_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.$form = $("#form");
                    this.$nameVendor = $("#name");
                    this.$upasswordVendor = $("#upassword");
                    this.$products = $("#products");
                    this.$oneproduct = $("#oneproduct");
                    this.$button_deconnexion = $("#button_deconnexion");
                    //error
                    this.$errorName = $("#errorName");
                    this.$errorPassword = $("#errorPassword");
                    this.$errorVendor = $("#errorVendor");
                }
                getCurrentVendor() {
                    return this.currentVendor;
                }
                setCurrentVendor(vendor) {
                    this.currentVendor = vendor;
                }
                CheckError() {
                    let nameError = this.$nameVendor.val();
                    let passwordError = this.$upasswordVendor.val();
                    let name = true;
                    let password = true;
                    if (nameError.length < 3) {
                        this.$errorName.show();
                        name = false;
                    }
                    else {
                        this.$errorName.hide();
                        name = true;
                    }
                    if (passwordError.length < 3) {
                        this.$errorPassword.show();
                        password = false;
                    }
                    else {
                        this.$errorPassword.hide();
                        password = true;
                    }
                    if (name == true && password == true) {
                        return true;
                    }
                    return false;
                }
                GetOneVendor(vendor) {
                    var api = APIService_1.APIService.getService();
                    let OneVendor = api.getVendor(vendor);
                    OneVendor
                        .then((OneVendor) => {
                        if (OneVendor.success == true) {
                            console.log(OneVendor);
                            let vendor = new Vendor_1.Vendor(OneVendor.vendor.name, OneVendor.vendor.upassword);
                            this.currentVendor = vendor;
                            this.currentVendor.setID(OneVendor.vendor.id);
                            console.log(this.currentVendor);
                            //passe page 2
                            this.$form.hide();
                            this.GetallByvendorId(this.currentVendor);
                            $("#Page").slideUp("slow");
                            $("fieldset").hide();
                            $("#cat").fadeIn(500);
                            this.$button_deconnexion.show();
                        }
                        else
                            this.$errorVendor.show();
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                GetallByvendorId(vendor) {
                    var api = APIService_1.APIService.getService();
                    let allOnVendor = api.Getall(vendor);
                    console.log(vendor.getId());
                    allOnVendor
                        .then((allOnVendor) => {
                        console.log(allOnVendor);
                        for (let cat of allOnVendor.Catvendor) {
                            let categories = new Category_1.Category(cat.id, cat.name);
                            categories.display($("#cat"));
                        }
                        //passe page 2
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                getProductbyCat(idCat, idVend) {
                    var api = APIService_1.APIService.getService();
                    let product = api.GetProduct(idCat, idVend);
                    //console.log(vendor.getId());
                    product
                        .then((data) => {
                        console.log(data.Catproduct);
                        for (let prod of data.Catproduct) {
                            let products = new Product_1.Product(prod.id, prod.name, prod.prix, prod.categoryId);
                            products.display(this.$products);
                        }
                        //passe page 2
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                getProductByID(data) {
                    var api = APIService_1.APIService.getService();
                    let product = api.GetoneProduct(data);
                    product
                        .then((data) => {
                        console.log(data.productID);
                        let theProduct = data.productID;
                        let product = new Product_1.Product(theProduct.id, theProduct.name, theProduct.prix, theProduct.categoryId);
                        product.displayoneProduct(this.$oneproduct);
                        //passe page 2
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
            };
            exports_6("App", App);
        }
    };
});
System.register("BDD", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var BDD;
    return {
        setters: [],
        execute: function () {
            exports_7("BDD", BDD = {
                categories: [
                    {
                        id: 1,
                        name: "Rouge"
                    },
                    {
                        id: 2,
                        name: "Rose"
                    },
                    {
                        id: 3,
                        name: "Blanc"
                    },
                ],
                products: [
                    {
                        id: 1,
                        name: "bordeaux",
                        categoryId: 1
                    },
                    {
                        id: 2,
                        name: "rivesalte",
                        categoryId: 3
                    },
                    {
                        id: 3,
                        name: "champagne",
                        categoryId: 2
                    },
                    {
                        id: 4,
                        name: "champagne1",
                        categoryId: 1
                    },
                    {
                        id: 5,
                        name: "champagne2",
                        categoryId: 1
                    },
                    {
                        id: 6,
                        name: "champagne3",
                        categoryId: 1
                    },
                    {
                        id: 7,
                        name: "champagne4",
                        categoryId: 1
                    }
                ],
                vendors: [
                    {
                        id: 1,
                        name: "Paul",
                        products: [1, 2]
                    },
                    {
                        id: 2,
                        name: "Jeremy",
                        products: [2]
                    },
                    {
                        id: 3,
                        name: "Stephane",
                        products: [3]
                    }
                ]
            });
        }
    };
});
System.register("main", ["App", "Vendor"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var App_1, Vendor_2, app;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            },
            function (Vendor_2_1) {
                Vendor_2 = Vendor_2_1;
            }
        ],
        execute: function () {
            app = new App_1.App();
            app.$form.submit(function (event) {
                event.preventDefault();
                let name = app.$nameVendor.val();
                let password = app.$upasswordVendor.val();
                //check error
                let chechError = app.CheckError();
                if ((chechError == true)) {
                    let vendor = new Vendor_2.Vendor(name, password);
                    app.GetOneVendor(vendor);
                }
            });
            $(document).on('click', ".container-cat", function () {
                app.$products.html("");
                let idCat = $(this).data("category");
                let idVend = app.getCurrentVendor().getId();
                app.getProductbyCat(idCat, idVend);
                $("#cat").hide();
                $("#button").show();
                $("#product-list").show("slow");
                $("#products").show();
                $("#h2").show();
                //console.log(idCat);
            });
            $("#button").click(function () {
                $(this).hide();
                $("#cat").fadeIn(2000);
                $("#products").slideUp("slow");
                $("#product-list").hide();
                $("#h2").hide();
                $(".closeDiv").hide();
                app.$oneproduct.hide();
            });
            $(document).on('click', ".item", function () {
                let data = $(this).data("product");
                app.getProductByID(data);
                $(".closeDiv").show();
                console.log(data);
            });
            $(".closeDiv").click(function () {
                $(this).hide();
                app.$oneproduct.hide();
            });
            app.$button_deconnexion.click(function () {
                location.reload();
            });
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRTL01vZGVsLnRzIiwiVFMvQ2F0ZWdvcnkudHMiLCJUUy9Qcm9kdWN0LnRzIiwiVFMvVmVuZG9yLnRzIiwiVFMvQVBJU2VydmljZS50cyIsIlRTL0FwcC50cyIsIlRTL0JERC50cyIsIlRTL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBLFFBQUE7Z0JBS1EsWUFBYSxFQUFTO29CQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDakIsQ0FBQztnQkFFRCxLQUFLO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUVELE9BQU87b0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0QsS0FBSyxDQUFDLEVBQVM7b0JBQ1gsSUFBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUM7Z0JBQ2YsQ0FBQzthQUtKLENBQUE7O1FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7WUN0Qk4sV0FBQSxjQUFzQixTQUFRLGFBQUs7Z0JBSy9CLFlBQVksRUFBUyxFQUFFLElBQVc7b0JBQzlCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFFVixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFFckIsQ0FBQztnQkFFRCxPQUFPO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyQixDQUFDO2dCQUVELE9BQU8sQ0FBQyxPQUFlO29CQUNyQiwwQkFBMEI7b0JBQ3hCLDRCQUE0QjtvQkFDNUIsSUFBSSxHQUFHLEdBQVcsNkJBQTZCLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxvQkFBb0IsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEVBQUUsQ0FBRTtvQkFDdEcsR0FBRyxJQUFFLG1EQUFtRCxDQUFBO29CQUM1RCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FB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QyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUN6QixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUVILENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztnQkFDN0IsSUFBSSxJQUFJLEdBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQVcsQ0FBQztnQkFDNUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDekIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBRUgsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNkLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7WUFFSCxHQUFHLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDO2dCQUMxQixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFBQSxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYWJzdHJhY3QgY2xhc3MgTW9kZWwge1xuICAgIFxuICAgICAgICBwcm90ZWN0ZWQgaWQ6IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkICRkb206IEpRdWVyeTtcbiAgICBcbiAgICAgICAgY29uc3RydWN0b3IoIGlkOm51bWJlciApe1xuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGdldElkKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBnZXQkRG9tKCk6IEpRdWVyeXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRkb207XG4gICAgICAgIH1cbiAgICAgICAgc2V0SUQoaWQ6bnVtYmVyKTp2b2lke1xuICAgICAgICAgICAgdGhpcy5pZD1pZDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICAvLyFJbXBvcnRhbnRcbiAgICAgICAgYWJzdHJhY3QgZGlzcGxheSggJHBhcmVudDogSlF1ZXJ5ICk6IHZvaWQ7XG4gICAgXG4gICAgfSIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIE1vZGVsIHtcblxuICAgIHByb3RlY3RlZCAkZG9tOkpRdWVyeTtcbiAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGlkOm51bWJlciwgbmFtZTpzdHJpbmcgKXtcbiAgICAgICAgc3VwZXIoaWQpO1xuICAgICAgXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICBcbiAgICB9XG5cbiAgICBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgZGlzcGxheSgkcGFyZW50OiBKUXVlcnkpOiB2b2lkIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubmFtZSk7XG4gICAgICAgIC8vIGxldCBpZDpudW1iZXIgPSAgdGhpcy5pZDtcbiAgICAgICAgbGV0IGRpdjogc3RyaW5nID0gXCI8ZGl2IGNsYXNzPScgY29udGFpbmVyLWNhdCBcIit0aGlzLm5hbWUrXCIgJyBkYXRhLWNhdGVnb3J5PSdcIit0aGlzLmlkK1wiJz5cIit0aGlzLm5hbWUrXCJcIiA7XG4gICAgICAgICAgICBkaXYrPVwiPGJyPjxpbWcgc3JjPSdpbWcvdmluLnBuZycgY2xhc3M9J2JvdXRWaW4nPjwvZGl2PlwiXG4gICAgICAgIHRoaXMuJGRvbSA9ICQoIGRpdiApO1xuICAgICAgICAkcGFyZW50LmFwcGVuZCggdGhpcy4kZG9tICk7XG5cbiAgICAgICBcbiAgICB9XG5cblxuXG59IiwiaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiLi9DYXRlZ29yeVwiO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9Nb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIE1vZGVsIHtcblxuICAgIHByaXZhdGUgbmFtZTpzdHJpbmc7XG4gICAgcHJpdmF0ZSBwcml4OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBjYXRlZ29yeTogQ2F0ZWdvcnk7XG4gICAgcHJvdGVjdGVkICRkb206IEpRdWVyeTtcblxuICAgIGNvbnN0cnVjdG9yKCBpZDogbnVtYmVyLCBuYW1lOnN0cmluZywgcHJpeDpudW1iZXIsIGNhdGVnb3J5OiBDYXRlZ29yeSApe1xuICAgICAgICBzdXBlcihpZCk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucHJpeCA9IHByaXg7XG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICB9XG5cbiAgICBnZXRDYXRlZ29yeSgpOiBDYXRlZ29yeSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhdGVnb3J5O1xuICAgIH1cblxuICAgIGRpc3BsYXkoIHBhcmVudDogSlF1ZXJ5ICk6IHZvaWQge1xuXG4gICAgICAgIC8vIGxldCBjYXRlZ29yeV9uYW1lOnN0cmluZyA9IHRoaXMuY2F0ZWdvcnkuZ2V0TmFtZSgpO1xuICAgICAgICAvLyBsZXQgaWQ6c3RyaW5nID0gIGNhdGVnb3J5X25hbWUgKyB0aGlzLmlkO1xuICAgICAgICAvLyBsZXQgZGF0YV9pZDogbnVtYmVyID0gdGhpcy5pZDtcbiAgICAgICAgbGV0IGRpdjogc3RyaW5nID0gXCI8ZGl2IGlkPSdcIit0aGlzLmlkK1wiJyBjbGFzcz0naXRlbSBcIit0aGlzLmNhdGVnb3J5K1wiJyAgZGF0YS1wcm9kdWN0PVwiK3RoaXMuaWQrXCIgPlwiK3RoaXMuaWQrXCIgXCIrdGhpcy5uYW1lK1wiPC9kaXY+XCI7XG5cbiAgICAgICAgdGhpcy4kZG9tID0gJCggZGl2ICk7XG4gICAgICAgIHBhcmVudC5hcHBlbmQoIHRoaXMuJGRvbSApO1xuXG4gICAgfVxuICAgIGRpc3BsYXlvbmVQcm9kdWN0KCBwYXJlbnQ6IEpRdWVyeSApOiB2b2lkIHtcbiAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByaXgpO1xuICAgICAgICBsZXQgZGl2OiBzdHJpbmcgPSBcIjxkaXYgaWQ9J1wiK3RoaXMuaWQrXCInICBkYXRhLXByb2R1Y3Q9XCIrdGhpcy5pZCtcIiA+IFwiICt0aGlzLm5hbWUrXCJcIjtcbiAgICAgICAgZGl2Kz1cIjxicj48aDE+XCIrdGhpcy5wcml4K1wiIOKCrDwvaDE+PC9kaXY+XCJcbiAgICAgICAgICAgICAgICBwYXJlbnQuaHRtbChcIlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRkb20gPSAkKCBkaXYgKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuc2hvdygpO1xuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmQoIHRoaXMuJGRvbSApO1xuICAgICAgICAgICAgfVxufSIsImltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi9Qcm9kdWN0XCI7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBWZW5kb3IgZXh0ZW5kcyBNb2RlbCB7XG4gICBcbiAgICBwcm90ZWN0ZWQgJGRvbTogSlF1ZXJ5O1xuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgcGFzc3dvcmQ6IHN0cmluZztcblxuICAgIHByaXZhdGUgcHJvZHVjdHM6IFByb2R1Y3RbXTtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLHBhc3N3b3JkOnN0cmluZyl7XG4gICAgICAgIHN1cGVyKDApOy8vaWQgPSAwIGVuIHN1cGVyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgLy90aGlzLnByb2R1Y3RzID0gcHJvZHVjdHM7XG4gICAgfVxuICAgIGdldE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG4gICAgZ2V0UGFzc3dvcmQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFzc3dvcmQ7XG4gICAgfVxuICBcbiAgICByZW1vdmVQcm9kdWN0QnlJZCggaWQ6bnVtYmVyICl7XG5cbiAgICAgICAgZm9yKCBsZXQga2V5IGluIHRoaXMucHJvZHVjdHMgKXtcblxuICAgICAgICAgICAgbGV0IHByb2R1Y3Q6IFByb2R1Y3QgPSB0aGlzLnByb2R1Y3RzW2tleV07XG4gICAgICAgICAgICBpZiggcHJvZHVjdC5nZXRJZCgpID09IGlkICl7XG4gICAgICAgICAgICAgICAgbGV0IG5rZXk6bnVtYmVyID0gcGFyc2VJbnQoIGtleSApO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdHMuc2xpY2UoIG5rZXksIDEgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHMoKTogUHJvZHVjdFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHM7XG4gICAgfVxuXG4gICAgYWRkUHJvZHVjdCggcHJvZHVjdDogUHJvZHVjdCApOiB2b2lke1xuICAgICAgICB0aGlzLnByb2R1Y3RzLnB1c2goIHByb2R1Y3QgKTtcbiAgICB9XG5cbiAgICByZW1vdmVQcm9kdWN0KCBwcm9kdWN0OiBQcm9kdWN0ICk6IHZvaWR7XG5cbiAgICAgICAgZm9yKCBsZXQga2V5IGluIHRoaXMucHJvZHVjdHMgKXtcblxuICAgICAgICAgICAgbGV0IHZwcm9kdWN0OiBQcm9kdWN0ID0gdGhpcy5wcm9kdWN0c1trZXldO1xuXG4gICAgICAgICAgICBpZiggdnByb2R1Y3QuZ2V0SWQoKSA9PSBwcm9kdWN0LmdldElkKCkgKXtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RzLnNwbGljZSggcGFyc2VJbnQoa2V5KSwgMSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBkaXNwbGF5KCRwYXJlbnQ6IEpRdWVyeSk6IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgbGV0IGRpdjogc3RyaW5nID0gXCI8ZGl2IGNsYXNzPSd2ZW5kb3InIGlkPSd2ZW5kb3JcIiArIHRoaXMuaWQgKyBcIicgZGF0YS12ZW5kb3I9J1wiICsgdGhpcy5pZCArIFwiJyA+XCI7XG4gICAgICAgIGRpdiArPSBcIjxhIGhyZWY9J2RldGFpbCc+XCI7ICAgIFxuICAgICAgICBkaXYgKz0gdGhpcy5uYW1lICsgXCI8L2E+PC9kaXY+XCI7XG4gICAgICAgICAgICBcbiAgICAgICAgdGhpcy4kZG9tID0gJCggZGl2ICk7XG4gICAgICAgICRwYXJlbnQuYXBwZW5kKCB0aGlzLiRkb20gKTtcblxuICAgIH1cblxuXG59IiwiaW1wb3J0IHtQcm9kdWN0fSBmcm9tICcuL1Byb2R1Y3QnO1xyXG5pbXBvcnQge1ZlbmRvcn0gZnJvbSAnLi9WZW5kb3InO1xyXG5leHBvcnQgY2xhc3MgQVBJU2VydmljZSB7XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQVBJU2VydmljZSA9IG51bGw7XHJcbiAgICAgICAgcHJpdmF0ZSB1cmw6c3RyaW5nID0gXCJodHRwOi8vbG9jYWxob3N0L1Byb2pldFZpbi9BUEkvXCI7XHJcbiAgICBcclxuICAgICAgICBzdGF0aWMgZ2V0U2VydmljZSgpOiBBUElTZXJ2aWNlIHtcclxuICAgIFxyXG4gICAgICAgICAgICBpZiggIUFQSVNlcnZpY2UuaW5zdGFuY2UgKVxyXG4gICAgICAgICAgICAgICAgQVBJU2VydmljZS5pbnN0YW5jZSA9IG5ldyBBUElTZXJ2aWNlKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgcmV0dXJuIEFQSVNlcnZpY2UuaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe31cclxuICAgIFxyXG4gICAgICAgIGdldFZlbmRvcigkdmVuZG9yOlZlbmRvcik6IFByb21pc2U8e30+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCArIFwidmVuZG9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kIDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGUgOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBkYXRhIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICBuYW1lIDogJHZlbmRvci5nZXROYW1lKCksXHJcbiAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkIDogJHZlbmRvci5nZXRQYXNzd29yZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKCB2ZW5kb3I6IHt9ICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCB2ZW5kb3IgKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAoIGVycm9yICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoIGVycm9yICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdldGFsbCgkdmVuZG9yOlZlbmRvcik6IFByb21pc2U8e30+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbmNvbnNvbGUubG9nKCR2ZW5kb3IpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwgKyBcInZlbmRvckNhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZCA6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlIDogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgdmVuZG9ySWQgOiAkdmVuZG9yLmdldElkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoIHZlbmRvcjoge30gKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoIHZlbmRvciApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ICggZXJyb3IgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCggZXJyb3IgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIEdldFByb2R1Y3QoaWRDYXQ6bnVtYmVyLGlkVmVuZDpudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCArIFwiUHJvZHVpdEJ5Q2F0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kIDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGUgOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBkYXRhIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICBjYXRJZCA6IGlkQ2F0LFxyXG4gICAgICAgICAgICAgICAgICAgIHZlbmRJZDppZFZlbmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICggY2F0UHJvZDogbnVtYmVyICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCBjYXRQcm9kICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogKCBlcnJvciApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCBlcnJvciApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHZXRvbmVQcm9kdWN0KGRhdGE6bnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwgKyBcIlByb2R1aXRCeWlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kIDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGUgOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBkYXRhIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SUQgOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoIHByb2R1Y3RJRDogbnVtYmVyICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCBwcm9kdWN0SUQgKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAoIGVycm9yICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoIGVycm9yICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICB9IiwiaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL1Byb2R1Y3RcIjtcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcbmltcG9ydCB7IFZlbmRvciB9IGZyb20gXCIuL1ZlbmRvclwiO1xuaW1wb3J0IHsgQVBJU2VydmljZSAgfSBmcm9tIFwiLi9BUElTZXJ2aWNlXCI7XG4gXG5leHBvcnQgY2xhc3MgQXBwIHtcblxuICAgIHB1YmxpYyAkZm9ybTogSlF1ZXJ5O1xuICAgIHB1YmxpYyAkbmFtZVZlbmRvcjogSlF1ZXJ5O1xuICAgIHB1YmxpYyAkdXBhc3N3b3JkVmVuZG9yOiBKUXVlcnk7XG4gICAgcHVibGljICRwcm9kdWN0czogSlF1ZXJ5O1xuICAgIHB1YmxpYyAkb25lcHJvZHVjdDogSlF1ZXJ5O1xuICAgIHB1YmxpYyAkYnV0dG9uX2RlY29ubmV4aW9uOiBKUXVlcnk7XG5cblxuICAgIHB1YmxpYyAkZXJyb3JOYW1lOiBKUXVlcnk7XG4gICAgcHVibGljICRlcnJvclBhc3N3b3JkOiBKUXVlcnk7XG4gICAgcHVibGljICRlcnJvclZlbmRvcjogSlF1ZXJ5O1xuXG5cbiAgICBwcml2YXRlICBjdXJyZW50VmVuZG9yOlZlbmRvcjtcbiAgIFxuICAgIGNvbnN0cnVjdG9yKCl7XG5cbiAgICAgICAgdGhpcy4kZm9ybSA9ICQoXCIjZm9ybVwiKTtcbiAgICAgICAgdGhpcy4kbmFtZVZlbmRvcj0kKFwiI25hbWVcIik7XG4gICAgICAgIHRoaXMuJHVwYXNzd29yZFZlbmRvciA9ICQoXCIjdXBhc3N3b3JkXCIpO1xuICAgICAgICB0aGlzLiRwcm9kdWN0cyA9ICQoXCIjcHJvZHVjdHNcIik7XG4gICAgICAgIHRoaXMuJG9uZXByb2R1Y3Q9ICQoXCIjb25lcHJvZHVjdFwiKTtcblxuXG4gICAgICAgIHRoaXMuJGJ1dHRvbl9kZWNvbm5leGlvbj0kKFwiI2J1dHRvbl9kZWNvbm5leGlvblwiKTtcbiAgICAgICAgLy9lcnJvclxuICAgICAgICB0aGlzLiRlcnJvck5hbWU9JChcIiNlcnJvck5hbWVcIik7XG4gICAgICAgIHRoaXMuJGVycm9yUGFzc3dvcmQ9JChcIiNlcnJvclBhc3N3b3JkXCIpO1xuICAgICAgICB0aGlzLiRlcnJvclZlbmRvcj0kKFwiI2Vycm9yVmVuZG9yXCIpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50VmVuZG9yKCk6VmVuZG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFZlbmRvcjtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50VmVuZG9yKCB2ZW5kb3I6VmVuZG9yICl7XG4gICAgICAgIHRoaXMuY3VycmVudFZlbmRvciA9IHZlbmRvcjtcbiAgICB9XG4gICBcblxuICAgIENoZWNrRXJyb3IoKTphbnl7XG4gICAgICAgIGxldCBuYW1lRXJyb3I6c3RyaW5nPXRoaXMuJG5hbWVWZW5kb3IudmFsKCkgYXMgc3RyaW5nO1xuICAgICAgICBsZXQgcGFzc3dvcmRFcnJvcjpzdHJpbmc9dGhpcy4kdXBhc3N3b3JkVmVuZG9yLnZhbCgpIGFzIHN0cmluZztcblxuICAgICAgICBsZXQgbmFtZTpib29sZWFuPXRydWU7XG4gICAgICAgIGxldCAgcGFzc3dvcmQ6Ym9vbGVhbj10cnVlO1xuXG4gICAgICAgIGlmIChuYW1lRXJyb3IubGVuZ3RoPDMpe1xuICAgICAgICAgICAgdGhpcy4kZXJyb3JOYW1lLnNob3coKTtcbiAgICAgICAgICAgIG5hbWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy4kZXJyb3JOYW1lLmhpZGUoKTtcbiAgICAgICAgICAgIG5hbWUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhc3N3b3JkRXJyb3IubGVuZ3RoPDMpe1xuICAgICAgICAgICAgdGhpcy4kZXJyb3JQYXNzd29yZC5zaG93KCk7XG4gICAgICAgICAgICBwYXNzd29yZCA9IGZhbHNlO1xuICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgIHtcbiAgICAgICAgICAgIHRoaXMuJGVycm9yUGFzc3dvcmQuaGlkZSgpO1xuICAgICAgICAgICAgIHBhc3N3b3JkID0gdHJ1ZTtcbiAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICAgaWYgKG5hbWU9PXRydWUgJiYgcGFzc3dvcmQ9PXRydWUpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICBcbiAgICAgICBcbiAgICAgICBcblxuICAgIH1cblxuICAgIEdldE9uZVZlbmRvcih2ZW5kb3I6VmVuZG9yKTp2b2lke1xuICAgICAgICBcbiAgICAgICAgdmFyIGFwaTpBUElTZXJ2aWNlID0gQVBJU2VydmljZS5nZXRTZXJ2aWNlKCk7XG4gICAgICAgIGxldCBPbmVWZW5kb3I6UHJvbWlzZTxhbnk+ID0gYXBpLmdldFZlbmRvcih2ZW5kb3IpO1xuICAgICAgIFxuICAgICAgICBPbmVWZW5kb3JcbiAgICAgICAgICAgIC50aGVuKCggT25lVmVuZG9yICkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChPbmVWZW5kb3Iuc3VjY2Vzcz09dHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKE9uZVZlbmRvcilcbiAgICAgICAgICAgICAgbGV0IHZlbmRvcj1uZXcgVmVuZG9yKE9uZVZlbmRvci52ZW5kb3IubmFtZSxPbmVWZW5kb3IudmVuZG9yLnVwYXNzd29yZClcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VmVuZG9yPXZlbmRvcjtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VmVuZG9yLnNldElEKE9uZVZlbmRvci52ZW5kb3IuaWQpO1xuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50VmVuZG9yKTtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAvL3Bhc3NlIHBhZ2UgMlxuICAgICAgICAgICAgICB0aGlzLiRmb3JtLmhpZGUoKTtcbiAgICAgICAgICAgICAgdGhpcy5HZXRhbGxCeXZlbmRvcklkKCB0aGlzLmN1cnJlbnRWZW5kb3IpO1xuICAgICAgICAgICAgICAkKFwiI1BhZ2VcIikuc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICAgICAgICQoXCJmaWVsZHNldFwiKS5oaWRlKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAkKFwiI2NhdFwiKS5mYWRlSW4oNTAwKTtcbiAgICAgICAgICAgICAgdGhpcy4kYnV0dG9uX2RlY29ubmV4aW9uLnNob3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZSB0aGlzLiRlcnJvclZlbmRvci5zaG93KCk7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSlcblxuICAgIH1cblxuICAgIEdldGFsbEJ5dmVuZG9ySWQodmVuZG9yOlZlbmRvcik6dm9pZHtcblxudmFyIGFwaTpBUElTZXJ2aWNlID0gQVBJU2VydmljZS5nZXRTZXJ2aWNlKCk7XG5sZXQgYWxsT25WZW5kb3I6UHJvbWlzZTxhbnk+ID0gYXBpLkdldGFsbCggdmVuZG9yKTtcbmNvbnNvbGUubG9nKHZlbmRvci5nZXRJZCgpKTtcbmFsbE9uVmVuZG9yXG4gICAgLnRoZW4oKCBhbGxPblZlbmRvciApID0+IHtcbiAgICAgICAgXG4gICAgICBcbiAgICAgIFxuICAgICAgIGNvbnNvbGUubG9nKGFsbE9uVmVuZG9yKTtcbiAgICAgICBmb3IobGV0IGNhdCBvZiBhbGxPblZlbmRvci5DYXR2ZW5kb3IgKXtcbiAgICAgICAgICAgXG4gICAgICAgICAgIGxldCBjYXRlZ29yaWVzOkNhdGVnb3J5ID1uZXcgQ2F0ZWdvcnkoY2F0LmlkLGNhdC5uYW1lKVxuICAgICAgICAgICBjYXRlZ29yaWVzLmRpc3BsYXkoJChcIiNjYXRcIikpO1xuICAgICAgIH1cblxuICAgICAgLy9wYXNzZSBwYWdlIDJcbiAgICAgXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KVxuICAgIH1cbiAgXG5cbiAgICBnZXRQcm9kdWN0YnlDYXQoaWRDYXQ6bnVtYmVyLGlkVmVuZDpudW1iZXIpOnZvaWR7XG4gICAgICAgIHZhciBhcGk6QVBJU2VydmljZSA9IEFQSVNlcnZpY2UuZ2V0U2VydmljZSgpO1xuICAgICAgICBsZXQgcHJvZHVjdDpQcm9taXNlPGFueT4gPSBhcGkuR2V0UHJvZHVjdCggaWRDYXQsaWRWZW5kKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh2ZW5kb3IuZ2V0SWQoKSk7XG4gICAgICAgIHByb2R1Y3RcbiAgICAgICAgICAgIC50aGVuKCggZGF0YSApID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5DYXRwcm9kdWN0KTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHByb2Qgb2YgZGF0YS5DYXRwcm9kdWN0KXtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RzOlByb2R1Y3QgPW5ldyBQcm9kdWN0KHByb2QuaWQscHJvZC5uYW1lLHByb2QucHJpeCxwcm9kLmNhdGVnb3J5SWQpXG4gICAgICAgICAgICAgICAgICAgcHJvZHVjdHMuZGlzcGxheSggdGhpcy4kcHJvZHVjdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgIC8vcGFzc2UgcGFnZSAyXG4gICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdldFByb2R1Y3RCeUlEKGRhdGE6bnVtYmVyKTp2b2lke1xuICAgICAgICAgICAgICAgIHZhciBhcGk6QVBJU2VydmljZSA9IEFQSVNlcnZpY2UuZ2V0U2VydmljZSgpO1xuICAgICAgICAgICAgICAgIGxldCBwcm9kdWN0OlByb21pc2U8YW55PiA9IGFwaS5HZXRvbmVQcm9kdWN0KCBkYXRhKTtcbiAgICAgICAgICAgICAgICBwcm9kdWN0XG4gICAgICAgICAgICAgICAgLnRoZW4oKCBkYXRhICkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5wcm9kdWN0SUQpO1xuXG4gICAgICAgICAgICAgICAgICAgbGV0IHRoZVByb2R1Y3Q9ZGF0YS5wcm9kdWN0SUQ7XG4gICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y3Q6UHJvZHVjdCA9bmV3IFByb2R1Y3QodGhlUHJvZHVjdC5pZCx0aGVQcm9kdWN0Lm5hbWUsdGhlUHJvZHVjdC5wcml4LHRoZVByb2R1Y3QuY2F0ZWdvcnlJZClcbiAgICAgICAgICAgICAgICAgICBwcm9kdWN0LmRpc3BsYXlvbmVQcm9kdWN0KCB0aGlzLiRvbmVwcm9kdWN0KTtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvL3Bhc3NlIHBhZ2UgMlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IEJERDp7IFxuICAgIGNhdGVnb3JpZXMgOiB7IGlkOm51bWJlciwgbmFtZTpzdHJpbmd9W10sXG4gICAgcHJvZHVjdHMgOiB7IGlkOm51bWJlciwgbmFtZTogc3RyaW5nLCBjYXRlZ29yeUlkOiBudW1iZXIgfVtdLFxuICAgIHZlbmRvcnMgOiB7IGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZywgcHJvZHVjdHM6IG51bWJlcltdIH1bXVxuIH0gXG4gICAgPSB7XG5cbiAgICBjYXRlZ29yaWVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgbmFtZTogXCJSb3VnZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgbmFtZTogXCJSb3NlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgICBuYW1lOiBcIkJsYW5jXCJcbiAgICAgICAgfSxcbiAgICBdLFxuICAgIHByb2R1Y3RzIDogW1xuICAgICAgICB7XG4gICAgICAgICAgICBpZCA6IDEsXG4gICAgICAgICAgICBuYW1lIDogXCJib3JkZWF1eFwiLFxuICAgICAgICAgICAgY2F0ZWdvcnlJZCA6IDFcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQgOiAyLFxuICAgICAgICAgICAgbmFtZSA6IFwicml2ZXNhbHRlXCIsXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogM1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZCA6IDMsXG4gICAgICAgICAgICBuYW1lIDogXCJjaGFtcGFnbmVcIixcbiAgICAgICAgICAgIGNhdGVnb3J5SWQgOiAyXG4gICAgICAgIH1cbiAgICAgICAgLFxuICAgICAgICB7XG4gICAgICAgICAgICBpZCA6IDQsXG4gICAgICAgICAgICBuYW1lIDogXCJjaGFtcGFnbmUxXCIsXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogMVxuICAgICAgICB9XG4gICAgICAgICxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQgOiA1LFxuICAgICAgICAgICAgbmFtZSA6IFwiY2hhbXBhZ25lMlwiLFxuICAgICAgICAgICAgY2F0ZWdvcnlJZCA6IDFcbiAgICAgICAgfVxuICAgICAgICAsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkIDogNixcbiAgICAgICAgICAgIG5hbWUgOiBcImNoYW1wYWduZTNcIixcbiAgICAgICAgICAgIGNhdGVnb3J5SWQgOiAxXG4gICAgICAgIH1cbiAgICAgICAgLFxuICAgICAgICB7XG4gICAgICAgICAgICBpZCA6IDcsXG4gICAgICAgICAgICBuYW1lIDogXCJjaGFtcGFnbmU0XCIsXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogMVxuICAgICAgICB9XG4gICAgXSxcbiAgICB2ZW5kb3JzIDogW1xuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIG5hbWU6IFwiUGF1bFwiLFxuICAgICAgICAgICAgcHJvZHVjdHMgOiBbIDEsIDIgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgIG5hbWU6IFwiSmVyZW15XCIsXG4gICAgICAgICAgICBwcm9kdWN0cyA6IFsgMiBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgICAgbmFtZTogXCJTdGVwaGFuZVwiLFxuICAgICAgICAgICAgcHJvZHVjdHMgOiBbIDMgXVxuICAgICAgICB9XG5cbiAgICBdXG5cblxufSIsImltcG9ydCB7IEFwcCB9IGZyb20gXCIuL0FwcFwiO1xuLy9pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4vUHJvZHVjdFwiO1xuaW1wb3J0IHsgVmVuZG9yIH0gZnJvbSBcIi4vVmVuZG9yXCI7XG5cblxudmFyIGFwcDpBcHAgPSBuZXcgQXBwKCk7XG5hcHAuJGZvcm0uc3VibWl0KGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBuYW1lPWFwcC4kbmFtZVZlbmRvci52YWwoKSBhcyBzdHJpbmc7XG4gICAgbGV0IHBhc3N3b3JkPWFwcC4kdXBhc3N3b3JkVmVuZG9yLnZhbCgpIGFzIHN0cmluZztcblxuICAgIC8vY2hlY2sgZXJyb3JcbiAgICBsZXQgY2hlY2hFcnJvcjpib29sZWFuPWFwcC5DaGVja0Vycm9yKCk7XG4gIFxuICAgIGlmICgoY2hlY2hFcnJvcj09dHJ1ZSkpIHtcbiAgICBcbiAgICBsZXQgdmVuZG9yPW5ldyBWZW5kb3IobmFtZSxwYXNzd29yZCk7XG4gICAgYXBwLkdldE9uZVZlbmRvcih2ZW5kb3IpO1xuXG4gICAgfVxuXG59KTtcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFwiLmNvbnRhaW5lci1jYXRcIixmdW5jdGlvbigpe1xuYXBwLiRwcm9kdWN0cy5odG1sKFwiXCIpO1xubGV0IGlkQ2F0PSQodGhpcykuZGF0YShcImNhdGVnb3J5XCIpIGFzIG51bWJlcjtcbmxldCBpZFZlbmQ9YXBwLmdldEN1cnJlbnRWZW5kb3IoKS5nZXRJZCgpO1xuYXBwLmdldFByb2R1Y3RieUNhdChpZENhdCxpZFZlbmQpO1xuJChcIiNjYXRcIikuaGlkZSgpO1xuJChcIiNidXR0b25cIikuc2hvdygpO1xuJChcIiNwcm9kdWN0LWxpc3RcIikuc2hvdyhcInNsb3dcIik7XG4kKFwiI3Byb2R1Y3RzXCIpLnNob3coKTtcblxuJChcIiNoMlwiKS5zaG93KCk7XG5cbi8vY29uc29sZS5sb2coaWRDYXQpO1xufSk7XG4kKFwiI2J1dHRvblwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgICQodGhpcykuaGlkZSgpO1xuICAgICQoXCIjY2F0XCIpLmZhZGVJbigyMDAwKTtcbiAgICAkKFwiI3Byb2R1Y3RzXCIpLnNsaWRlVXAoXCJzbG93XCIpO1xuICAgICQoXCIjcHJvZHVjdC1saXN0XCIpLmhpZGUoKVxuICAgICQoXCIjaDJcIikuaGlkZSgpO1xuICAgICQoXCIuY2xvc2VEaXZcIikuaGlkZSgpO1xuICAgIGFwcC4kb25lcHJvZHVjdC5oaWRlKCk7XG59KTtcblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgXCIuaXRlbVwiLGZ1bmN0aW9uKCl7XG4gICBsZXQgZGF0YT0gJCh0aGlzKS5kYXRhKFwicHJvZHVjdFwiKSBhcyBudW1iZXI7XG4gICBhcHAuZ2V0UHJvZHVjdEJ5SUQoZGF0YSk7XG4gICAkKFwiLmNsb3NlRGl2XCIpLnNob3coKTtcbiAgIGNvbnNvbGUubG9nKGRhdGEpO1xufSk7XG5cbiQoXCIuY2xvc2VEaXZcIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICQodGhpcykuaGlkZSgpO1xuICAgIGFwcC4kb25lcHJvZHVjdC5oaWRlKCk7XG59KTtcblxuYXBwLiRidXR0b25fZGVjb25uZXhpb24uY2xpY2soZnVuY3Rpb24oKXtcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbn0pIl19
