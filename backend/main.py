from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils.solar_utils import calculate_solar_design, calculate_battery_sizing, select_inverter_type
from utils.solar_utils import get_emission_factor, calculate_yearly_co2_reduction, calculate_lifetime_co2_reduction
from utils.solar_utils import get_nz_winter_sunlight_hours, get_sa_winter_sunlight_hours
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SolarDesignInput(BaseModel):
    daily_load: float # in kWh
    panel_wattage: float # in watts
    pv_system_size: float # in kW
    inverter_type: str # "grid_tied", "hybrid"
    derate_factor: float = 0.8 # default derate factor for system losses
    battery_capacity: float # in kWh
    sunlight_hours: float
    back_up_days: float = 1 # default to 1 backup day if not provided
    depth_of_discharge: float = 0.8 # default depth of discharge (0.8 for 80%)
    efficiency: float = 0.9 # default efficiency of the battery (0.9 for 90%)
    country: str # country for emission factor, e.g. "New Zealand" or "South Africa"
    


@app.post("/utils/calculate_solar_design")
def calculate_solar_design_endpoint(data: SolarDesignInput):
    try:
        result = calculate_solar_design(
            panel_wattage=data.panel_wattage,
            sunlight_hours=data.sunlight_hours,
            inverter_type=data.inverter_type,
            battery_capacity=data.battery_capacity,
            pv_system_size=data.pv_system_size,
            daily_load=data.daily_load,
            derate_factor=data.derate_factor,
            back_up_days=data.back_up_days,
            country=data.country,
            depth_of_discharge=data.depth_of_discharge,
            efficiency=data.efficiency,
            
        )
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Solar design calculation failed: {str(e)}")


class GetEmissionFactorInput(BaseModel):
    country: str

@app.post("/utils/get_emission_factor")
def get_emission_factor_endpoint(data: GetEmissionFactorInput):
    try:
        result = get_emission_factor(
            country=data.country
        )
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get emission factor: {str(e)}")
    

class CalculateYearlyCO2ReductionInput(BaseModel):
    country: str
    annual_energy_production: float 
    emission_factor: float

@app.post("/utils/calculate_yearly_co2_reduction")
def calculate_yearly_co2_reduction_endpoint(data: CalculateYearlyCO2ReductionInput):
    try:
        result = calculate_yearly_co2_reduction(
            country=data.country,
            annual_energy_production=data.annual_energy_production,
            emission_factor=data.emission_factor
        )
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Yearly CO2 reduction calculation failed: {str(e)}")


class CalculateLifetimeCO2ReductionInput(BaseModel):
    country: str
    annual_energy_production: float
    emission_factor: float
    lifetime_years: int = 25  # default lifetime of solar system in years
    

@app.post("/utils/calculate_lifetime_co2_reduction")
def calculate_lifetime_co2_reduction_endpoint(data: CalculateLifetimeCO2ReductionInput):
    try:
        result = calculate_lifetime_co2_reduction(
            country=data.country,
            annual_energy_production=data.annual_energy_production,
            emission_factor=data.emission_factor,
            lifetime_years=data.lifetime_years,
        )
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lifetime CO2 reduction calculation failed: {str(e)}")
    



# Function to get NZ winter sunlight hours
class GetNZWinterSunlightHoursInput(BaseModel):
    region: str

@app.post("/utils/get_nz_winter_sunlight_hours")
def get_nz_winter_sunlight_hours_endpoint(data: GetNZWinterSunlightHoursInput):
    try: 
        result = get_nz_winter_sunlight_hours(
            region=data.region
        )
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get NZ winter sunlight hours: {str(e)}")

# Function to get SA winter sunlight hours
class GetSAWinterSunlightHoursInput(BaseModel):
    region: str

@app.post("/utils/get_sa_winter_sunlight_hours")
def get_sa_winter_sunlight_hours_endpoint(data: GetSAWinterSunlightHoursInput):
    try:
        result = get_sa_winter_sunlight_hours(
            region=data.region
        )
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get SA winter sunlight hours: {str(e)}")


# Function to calculate battery sizing
class CalculateBatterySizingInput(BaseModel):
    daily_load: float  # in kWh
    back_up_days: float  # number of backup days
    efficiency: float  # in decimal form (e.g. 0.9 for 90)
    depth_of_discharge: float = 0.8  # default depth of discharge (0.8 for 80%)

@app.post("/utils/calculate_battery_sizing")
def calculate_battery_sizing_endpoint(data: CalculateBatterySizingInput):
    try:
        result = calculate_battery_sizing(
            daily_load=data.daily_load,
            back_up_days=data.back_up_days,
            depth_of_discharge=data.depth_of_discharge,
            efficiency=data.efficiency,
        )
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Battery sizing calculation failed: {str(e)}")    
        



# Function to select inverter type
class SelectInverterTypeInput(BaseModel):
    inverter_type: str  # "grid_tied", "hybrid"

@app.post("/utils/select_inverter_type")
def select_inverter_type_endpoint(data: SelectInverterTypeInput):
    try:
        result = select_inverter_type(
            inverter_type=data.inverter_type
        )
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inverter type selection failed: {str(e)}")           