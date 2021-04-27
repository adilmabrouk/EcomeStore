using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreDBContext _storeDBContext;

        public ProductRepository(StoreDBContext storeDBContext)
        {
            _storeDBContext = storeDBContext;
        }
        public async Task<Product> GetProductAsync(int id)
        {
            var product = await _storeDBContext.Products
                          .Include(b => b.ProductBrand)
                          .Include(t => t.ProductType)
                          .FirstOrDefaultAsync(p => p.Id == id);
            return product;     
        }

  
        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
                var products = await _storeDBContext.Products
                               .Include(b => b.ProductBrand)
                               .Include(t => t.ProductType)
                               .ToListAsync();
                return products;
        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            var types = await _storeDBContext.ProductTypes.ToListAsync();
            return types;
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            var brands = await _storeDBContext.ProductBrands.ToListAsync();
            return brands;
        }

    }
}
