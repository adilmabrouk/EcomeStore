using API.Dtos;
using API.Errors;
using API.Helpers;
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
        public async Task<Pagination<ProductToReturnDto>> GetProducts([FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductWithBrandAndTypeSpecification(productParams);

            var countSpec = new ProductWithFiltersForCountSpecification(productParams);

            var totalItem = await _productRepo.CountAsync(countSpec);

            var products = await _productRepo.ListAsync(spec);
            
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItem, data);
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
