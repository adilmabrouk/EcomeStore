using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IGeniricRepository<Product> _productRepo;
        private readonly IGeniricRepository<ProductBrand> _productBrandRepo;
        private readonly IGeniricRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;

        public ProductsController(
                                  IGeniricRepository<Product> productRepo , 
                                  IGeniricRepository<ProductBrand> productBrandRepo ,
                                  IGeniricRepository<ProductType> productTypeRepo,
                                  IMapper mapper
                                 )
        {
            _productRepo = productRepo;
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IReadOnlyList<ProductToReturnDto>> GetProducts()
        {
            var spec = new ProductWithBrandAndTypeSpecification();    
            var products = await _productRepo.ListAsync(spec);
            //return Ok(products);

            return _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductWithBrandAndTypeSpecification(id);

            var product = await _productRepo.GetEntityWithSpec(spec);

            if (product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            var brands = await _productBrandRepo.ListAllAsync();
            return Ok(brands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductTypes()
        {
            var types = await _productTypeRepo.ListAllAsync();
            return Ok(types);
        }
    }
}
