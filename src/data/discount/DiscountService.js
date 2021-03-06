import axios from 'axios';

const credentials = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==", "Content-Type": "application/json"};
const url = "https://localhost:8443";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var DiscountService = {

    findAllDiscounts(args) {

        return axios.get(`${url}/jeeshop-admin/rs/discounts`, {params: args, headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    findDiscountById(id, locale) {

        let params = locale ? {locale: locale} : {};
        return axios.get(`${url}/jeeshop-admin/rs/discounts/${id}`, {params: params, headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    findDiscountsWithMultipleIds(args) {

        if(!args) {
            return null;
        }

        let calls = args.map(id => {
            return this.findDiscountById(id)
        });

        return axios.all(calls)
            .then(axios.spread((args) => {
                    console.log("args : " + JSON.stringify(args));
            }))
    },
    createDiscount(input) {
        return axios.post(`${url}/jeeshop-admin/rs/discounts/`, input, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    modifyDiscount(input) {
        return axios.put(`${url}/jeeshop-admin/rs/discounts/`, input, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    deleteDiscount(id) {
        return axios.delete(`${url}/jeeshop-admin/rs/discounts/${id}`, {headers: credentials})
            .then((response) => response)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
                return {}
            })
    },
    findDiscountLocalizedContent(id, locale) {
        return axios.get(`${url}/jeeshop-admin/rs/discounts/${id}/presentations/${locale}`, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    deleteDiscountLocalizedContent(discountId, locale) {
        return axios.delete(`${url}/jeeshop-admin/rs/discounts/${discountId}/presentations/${locale}`, {headers: credentials})
            .then((response) => {
                if(response.status == "204") return {success: true}
            })
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    createDiscountLocalizedContent(discountId, locale, presentationObject) {
        return axios.post(`${url}/jeeshop-admin/rs/discounts/${discountId}/presentations/${locale}`, presentationObject, {headers: credentials})
            .then((response) => {
                console.log("response.data : " + JSON.stringify(response.data));
                return response.data;
            })
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    modifyDiscountLocalizedContent(discountId, locale, presentationObject) {
        return axios.put(`${url}/jeeshop-admin/rs/discounts/${discountId}/presentations/${locale}`, presentationObject, {headers: credentials})
            .then((response) => {
                console.log("response : " + JSON.stringify(response.data));
                return response.data
            })
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },

};
export default DiscountService;