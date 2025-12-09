# New Zealand Sunlight Hours
def get_nz_winter_sunlight_hours(region: str):
    """Return estimated winter sunlight hours based on region approximation"""
    if "Auckland" in region:
        return 4.2  
    elif "Wellington" in region:
        return 3.4  
    elif "Christchurch" in region:
        return 4  
    


# South Africa Sunlight Hours
def get_sa_winter_sunlight_hours(region: str):
    """Return estimated winter sunlight hours based on region approximation"""
    if "Cape Town" in region:
        return 4.9  
    elif "Durban" in region:
        return 4.9 
    elif "Joahannesaburg" in region:
        return 5.5 
    



# Emission Factor For Country's Power Grid
def get_emission_factor(country: str):
    """Return emission factor for the country's power grid in kg CO2/kWh"""
    emission_factors = {
        "nz": 0.15,
        "new zealand": 0.15,
        "sa": 0.94,
        "south africa": 0.94
    }
    return emission_factors.get(country.strip().lower(), 0.15)  # Default to NZ if not found

# Calculate Yearly CO2 reduction form each system
def calculate_yearly_co2_reduction(
        country: str,
        annual_energy_production: float, # in kWh
        emission_factor: float,
):
    """Calculate the yearly CO2 reduction from a solar system"""
    emission_factor = get_emission_factor(country)
    return annual_energy_production * emission_factor  # in kg CO2


# Calculate lifetime CO2 reduction from a solar system (25 years is typical)
def calculate_lifetime_co2_reduction(
        country: str,
        annual_energy_production: float, # in kWh
        emission_factor: float,
        lifetime_years: int = 25
):
    """Calculate the lifetime CO2 reduction from a solar system"""
    yearly_reduction = calculate_yearly_co2_reduction(country, annual_energy_production, emission_factor)
    return yearly_reduction * lifetime_years  # in kg CO2



# Function input: Solar panel wattage, sunlight hours, roof space, mode, inverter type, battery capacity and derate factor
def calculate_solar_design (
        panel_wattage: float, sunlight_hours: float, inverter_type: str, battery_capacity: float, pv_system_size: float,
        daily_load: float, back_up_days: float, country: str, derate_factor: float = 0.8, depth_of_discharge: float = 0.8, efficiency: float = 0.9,
        
):
    """Calculate solar design based on input parameters"""
    # Constants
    panel_wattage = panel_wattage  # in watts
    sunlight_hours = sunlight_hours  # in hours
    inverter_type = inverter_type  # "grid_tied", "hybrid"
    battery_capacity = battery_capacity  # in kWh
    derate_factor = derate_factor  # derate factor for system losses
    daily_load = daily_load  # in kWh
    pv_system_size = pv_system_size  # in kW
    back_up_days = back_up_days  # number of backup days
    depth_of_discharge = depth_of_discharge  # depth of discharge (0.8 for 80%)
    efficiency = efficiency  # efficiency (0.9 for 90%)


    # Calculate Panel Size
    pv_system_size = daily_load / (sunlight_hours * derate_factor)  # in kW


    # Calculate Battery Size
    battery_size = calculate_battery_sizing(daily_load, back_up_days, depth_of_discharge=0.8, efficiency=0.9)

    # Calculate Annual Energy Production
    annual_energy_production = pv_system_size * sunlight_hours * 365 * derate_factor  # in kWh

    # Choose Country For Emission Factor
    emission_factor = get_emission_factor(country)
    

    # Calculate Yearly and Lifetime CO2 Reduction
    yearly_co2 = calculate_yearly_co2_reduction(country, annual_energy_production=annual_energy_production, emission_factor=emission_factor)
    lifetime_co2 = calculate_lifetime_co2_reduction(country, annual_energy_production=annual_energy_production, emission_factor=emission_factor)

    return {
        "pv_system_size": pv_system_size,
        "battery_size": battery_size,
        "annual_energy_production": annual_energy_production,
        "yearly_co2_reduction": yearly_co2,
        "lifetime_co2_reduction": lifetime_co2,
    }
    

    
# Battery Sizing
def calculate_battery_sizing(
        daily_load: float, back_up_days: float, depth_of_discharge: float = 0.8, efficiency: float = 0.9
):
    """Calculate battery sizing based on daily load, backup days, depth of discharge, and efficiency"""
    # Daily load in kWh
    daily_load = daily_load  # in kWh
    back_up_days = back_up_days  # number of days to back up
    depth_of_discharge = depth_of_discharge # depth of discharge (0.8 for 80%)
    efficiency = efficiency # efficiency of the battery (0.9 for 90%)
    
    # Calculate Battery Size
    battery_size = (daily_load * back_up_days) / (depth_of_discharge * efficiency)  # in kWh
    return battery_size  # Return the calculated battery size in kWh



# Inverter Type Selection
def select_inverter_type(
        inverter_type: str
        ):
    
    """Select inverter type """
    # Inverter type can be "grid_tied", "hybrid"
    inverter_type = inverter_type # "grid_tied", "hybrid"

    if inverter_type ==  "grid_tied":
        inverter_type = "grid_tied"
    elif inverter_type == "hybrid":
        inverter_type = "hybrid"
    else:
        inverter_type = "unknown"
    return inverter_type  # Return the selected inverter type

# Inverter Size recommendation based on invertertype and pv system size







    
    
    
    
  

     
    

    
    
    
    
