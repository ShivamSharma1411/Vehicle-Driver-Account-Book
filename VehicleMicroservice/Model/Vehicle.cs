﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Vehicle_Microservice.Model
{
    public class Vehicle
    {
        [Key]
        public int	RegistrationNo { get; set; }
	    public string ModelName { get; set; }
	    public string VehicleType { get; set; }
	    public int NumberOfSeat { get; set; }
	    public string AcAvailable { get; set; }

    }
}
