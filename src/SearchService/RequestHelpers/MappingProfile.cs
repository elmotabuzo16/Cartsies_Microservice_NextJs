using System;
using AutoMapper;
using Contracts;
using SearchService.Entities;

namespace SearchService.RequestHelpers;

public class MappingProfile : Profile
{
  public MappingProfile()
  {
    CreateMap<AuctionCreated, Item>();
  }
}
