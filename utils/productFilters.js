class ProductFilter {
    constructor(method, query) {
        this.method = method;
        this.query = query;
    }

    search = () => {
        const keyword = this.query.keyword
            ? {
                  title: {
                      $regex: this.query.keyword,
                      $options: "i",
                  },
              }
            : {};
        this.method = this.method.find(keyword);
        return this;
    };

    filter = () => {
        const queryCopy = { ...this.query };
        //removing fields from query
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        //price filter
        // const queryStr = JSON.stringify(queryCopy);
        // queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        // console.log(JSON.parse(queryStr));
        // this.method = this.method.find(JSON.parse(queryStr));
        this.method = this.method.find(queryCopy);
        return this;
    };

    pagination = (resultPerPage) => {
        const currentPage = Number(this.query.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.method = this.method.limit(resultPerPage).skip(skip);
        return this;
    };
}

export default ProductFilter;
