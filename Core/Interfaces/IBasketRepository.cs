using Core.Entities;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        Task<CostumerBasket> GetBasketAsync(string basketId);

        Task<CostumerBasket> UpdateBasketAsync(CostumerBasket basket);

        Task<bool> DeleteBasketAsync(string basketId);
    }
}
