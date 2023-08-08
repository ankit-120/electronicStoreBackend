class ProductFilter {
    constructor(method, count, query) {
        this.method = method;
        this.query = query;
        this.count = count;
    }

    search = () => {
        const keyword = this.query.keyword
            ? [
                  {
                      title: {
                          $regex: this.query.keyword,
                          $options: "i",
                      },
                  },
                  {
                      brand: {
                          $regex: this.query.keyword,
                          $options: "i",
                      },
                  },
                  {
                      category: {
                          $regex: this.query.keyword,
                          $options: "i",
                      },
                  },
              ]
            : {};
        this.method = this.query.keyword
            ? this.method.find({ $or: keyword })
            : this.method.find();
        this.count = this.query.keyword
            ? this.count.countDocuments({ $or: keyword })
            : this.count.countDocuments();
        return this;
    };

    filter = () => {
        const queryCopy = { ...this.query };
        //removing fields from query
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        //price filter
        this.method = this.method.find(queryCopy);
        this.count = this.count.countDocuments(queryCopy);
        return this;
    };

    pagination = (resultPerPage) => {
        const currentPage = Number(this.query.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.method = this.method.limit(resultPerPage).skip(skip);
        // this.count = this.count.countDocuments();
        return this;
    };
}

export default ProductFilter;
