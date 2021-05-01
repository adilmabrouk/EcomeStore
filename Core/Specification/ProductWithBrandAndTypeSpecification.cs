using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Core.Specification
{
    public class ProductWithBrandAndTypeSpecification : BaseSpecification<Product>
    {
        public ProductWithBrandAndTypeSpecification(ProductSpecParams productParams) : base(
           x => 
           (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
           (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) && 
           (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId))
        {
            AddInclude(x => x.ProductBrand);

            AddInclude(x => x.ProductType);

            AddOrderBy(p => p.Name);

            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);




            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;

                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;

                    default:
                        AddOrderBy(p => p.Price);
                        break;
                }
            }
        }

        public ProductWithBrandAndTypeSpecification(int id) : base(p => p.Id == id)
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
        }
    }
}
