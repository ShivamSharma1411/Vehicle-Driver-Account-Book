﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Driver_Microservice.Model
{
    public class Driver
    {
        [Key]
       public int	DriverId { get; set; }
       public string Name { get; set; }
	   public int Age { get; set; }
 	   public string VehicleType { get; set; }
        
    }
}
