const prisma = require("../../prisma/prisma");

class MantenedoresService {
  // Contact Person methods
  async getAllContactPersons() {
    console.log("service Function");
    try {
      const contactPersons = await prisma.contactPerson.findMany({
        include: {
          contactType: true,
        },
      });
      return contactPersons;
    } catch (error) {
      throw new Error(`Error fetching contact persons: ${error.message}`);
    }
  }

  async getContactPersonById(id) {
    try {
      const contactPerson = await prisma.contactPerson.findUnique({
        where: { id: parseInt(id) },
        include: {
          contactType: true,
        },
      });

      if (!contactPerson) {
        throw new Error("Contact person not found");
      }

      return contactPerson;
    } catch (error) {
      throw new Error(`Error fetching contact person: ${error.message}`);
    }
  }

  async createContactPerson(contactPersonData) {
    try {
      const contactPerson = await prisma.contactPerson.create({
        data: {
          contactTypeId: parseInt(contactPersonData.contactTypeId),
          country: contactPersonData.country,
          fullName: contactPersonData.fullName,
          rut: contactPersonData.rut,
          lineOfBussines: contactPersonData.lineOfBussines,
          address: contactPersonData.address,
          email: contactPersonData.email,
          phoneNumber: contactPersonData.phoneNumber,
          contactName: contactPersonData.contactName,
          assignedEmployeeName: contactPersonData.assignedEmployeeName,
          seaVoucher: contactPersonData.seaVoucher || null,
          skyVouche: contactPersonData.skyVouche || null,
          landVoucher: contactPersonData.landVoucher || null,
          invoiceObservations: contactPersonData.invoiceObservations || null,
          invoiceInfo: contactPersonData.invoiceInfo || null,
        },
        include: {
          contactType: true,
        },
      });

      return contactPerson;
    } catch (error) {
      throw new Error(`Error creating contact person: ${error.message}`);
    }
  }

  async updateContactPerson(id, contactPersonData) {
    try {
      const contactPerson = await prisma.contactPerson.update({
        where: { id: parseInt(id) },
        data: {
          contactTypeId: parseInt(contactPersonData.contactTypeId),
          country: contactPersonData.country,
          fullName: contactPersonData.fullName,
          rut: contactPersonData.rut,
          lineOfBussines: contactPersonData.lineOfBussines,
          address: contactPersonData.address,
          email: contactPersonData.email,
          phoneNumber: contactPersonData.phoneNumber,
          contactName: contactPersonData.contactName,
          assignedEmployeeName: contactPersonData.assignedEmployeeName,
          seaVoucher: contactPersonData.seaVoucher || null,
          skyVouche: contactPersonData.skyVouche || null,
          landVoucher: contactPersonData.landVoucher || null,
          invoiceObservations: contactPersonData.invoiceObservations || null,
          invoiceInfo: contactPersonData.invoiceInfo || null,
        },
        include: {
          contactType: true,
        },
      });

      return contactPerson;
    } catch (error) {
      throw new Error(`Error updating contact person: ${error.message}`);
    }
  }

  async deleteContactPerson(id) {
    try {
      await prisma.contactPerson.delete({
        where: { id: parseInt(id) },
      });

      return { message: "Contact person deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting contact person: ${error.message}`);
    }
  }

  // Contact Type methods
  async getAllContactTypes() {
    try {
      const contactTypes = await prisma.contactType.findMany();
      return contactTypes;
    } catch (error) {
      throw new Error(`Error fetching contact types: ${error.message}`);
    }
  }

  async getContactTypeById(id) {
    try {
      const contactType = await prisma.contactType.findUnique({
        where: { id: parseInt(id) },
      });

      if (!contactType) {
        throw new Error("Contact type not found");
      }

      return contactType;
    } catch (error) {
      throw new Error(`Error fetching contact type: ${error.message}`);
    }
  }

  async createContactType(contactTypeData) {
    try {
      const contactType = await prisma.contactType.create({
        data: {
          name: contactTypeData.name,
        },
      });

      return contactType;
    } catch (error) {
      throw new Error(`Error creating contact type: ${error.message}`);
    }
  }

  async updateContactType(id, contactTypeData) {
    try {
      const contactType = await prisma.contactType.update({
        where: { id: parseInt(id) },
        data: {
          name: contactTypeData.name,
        },
      });

      return contactType;
    } catch (error) {
      throw new Error(`Error updating contact type: ${error.message}`);
    }
  }

  async deleteContactType(id) {
    try {
      await prisma.contactType.delete({
        where: { id: parseInt(id) },
      });

      return { message: "Contact type deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting contact type: ${error.message}`);
    }
  }

  // Port methods
  async getAllPorts() {
    try {
      const ports = await prisma.port.findMany();
      return ports;
    } catch (error) {
      throw new Error(`Error fetching ports: ${error.message}`);
    }
  }

  async getPortById(id) {
    try {
      const port = await prisma.port.findUnique({
        where: { id: id },
      });

      if (!port) {
        throw new Error("Port not found");
      }

      return port;
    } catch (error) {
      throw new Error(`Error fetching port: ${error.message}`);
    }
  }

  async createPort(portData) {
    try {
      const port = await prisma.port.create({
        data: {
          id: portData.id,
          name: portData.name,
          country: portData.country,
          address: portData.address,
          type: portData.type,
          onuCode: portData.onuCode || null,
          countryCode: portData.countryCode || null,
          portCode: portData.portCode || null,
          location: portData.location || null,
        },
      });

      return port;
    } catch (error) {
      throw new Error(`Error creating port: ${error.message}`);
    }
  }

  async updatePort(id, portData) {
    try {
      const port = await prisma.port.update({
        where: { id: id },
        data: {
          name: portData.name,
          country: portData.country,
          address: portData.address,
          type: portData.type,
          onuCode: portData.onuCode || null,
          countryCode: portData.countryCode || null,
          portCode: portData.portCode || null,
          location: portData.location || null,
        },
      });

      return port;
    } catch (error) {
      throw new Error(`Error updating port: ${error.message}`);
    }
  }

  async deletePort(id) {
    try {
      await prisma.port.delete({
        where: { id: id },
      });

      return { message: "Port deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting port: ${error.message}`);
    }
  }

  // Vessel methods
  async getAllVessels() {
    try {
      const vessels = await prisma.vessel.findMany();
      return vessels;
    } catch (error) {
      throw new Error(`Error fetching vessels: ${error.message}`);
    }
  }

  async getVesselById(id) {
    try {
      const vessel = await prisma.vessel.findUnique({
        where: { id: parseInt(id) },
      });

      if (!vessel) {
        throw new Error("Vessel not found");
      }

      return vessel;
    } catch (error) {
      throw new Error(`Error fetching vessel: ${error.message}`);
    }
  }

  async createVessel(vesselData) {
    try {
      const vessel = await prisma.vessel.create({
        data: {
          name: vesselData.name,
          code: vesselData.code || null,
          onuCode: vesselData.onuCode || null,
        },
      });

      return vessel;
    } catch (error) {
      throw new Error(`Error creating vessel: ${error.message}`);
    }
  }

  async updateVessel(id, vesselData) {
    try {
      const vessel = await prisma.vessel.update({
        where: { id: parseInt(id) },
        data: {
          name: vesselData.name,
          code: vesselData.code || null,
          onuCode: vesselData.onuCode || null,
        },
      });

      return vessel;
    } catch (error) {
      throw new Error(`Error updating vessel: ${error.message}`);
    }
  }

  async deleteVessel(id) {
    try {
      await prisma.vessel.delete({
        where: { id: parseInt(id) },
      });

      return { message: "Vessel deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting vessel: ${error.message}`);
    }
  }

  // PurchaseClause methods
  async getAllPurchaseClauses() {
    try {
      const purchaseClauses = await prisma.purchaseClause.findMany();
      return purchaseClauses;
    } catch (error) {
      throw new Error(`Error fetching purchase clauses: ${error.message}`);
    }
  }

  async getPurchaseClauseById(id) {
    try {
      const purchaseClause = await prisma.purchaseClause.findUnique({
        where: { id: parseInt(id) },
      });

      if (!purchaseClause) {
        throw new Error("Purchase clause not found");
      }

      return purchaseClause;
    } catch (error) {
      throw new Error(`Error fetching purchase clause: ${error.message}`);
    }
  }

  async createPurchaseClause(purchaseClauseData) {
    try {
      const purchaseClause = await prisma.purchaseClause.create({
        data: {
          name: purchaseClauseData.name,
        },
      });

      return purchaseClause;
    } catch (error) {
      throw new Error(`Error creating purchase clause: ${error.message}`);
    }
  }

  async updatePurchaseClause(id, purchaseClauseData) {
    try {
      const purchaseClause = await prisma.purchaseClause.update({
        where: { id: parseInt(id) },
        data: {
          name: purchaseClauseData.name,
        },
      });

      return purchaseClause;
    } catch (error) {
      throw new Error(`Error updating purchase clause: ${error.message}`);
    }
  }

  async deletePurchaseClause(id) {
    try {
      await prisma.purchaseClause.delete({
        where: { id: parseInt(id) },
      });

      return { message: "Purchase clause deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting purchase clause: ${error.message}`);
    }
  }

  // CargoCondition methods
  async getAllCargoConditions() {
    try {
      const cargoConditions = await prisma.cargoCondition.findMany();
      return cargoConditions;
    } catch (error) {
      throw new Error(`Error fetching cargo conditions: ${error.message}`);
    }
  }

  async getCargoConditionById(id) {
    try {
      const cargoCondition = await prisma.cargoCondition.findUnique({
        where: { id: parseInt(id) },
      });

      if (!cargoCondition) {
        throw new Error("Cargo condition not found");
      }

      return cargoCondition;
    } catch (error) {
      throw new Error(`Error fetching cargo condition: ${error.message}`);
    }
  }

  async createCargoCondition(cargoConditionData) {
    try {
      const cargoCondition = await prisma.cargoCondition.create({
        data: {
          name: cargoConditionData.name,
        },
      });

      return cargoCondition;
    } catch (error) {
      throw new Error(`Error creating cargo condition: ${error.message}`);
    }
  }

  async updateCargoCondition(id, cargoConditionData) {
    try {
      const cargoCondition = await prisma.cargoCondition.update({
        where: { id: parseInt(id) },
        data: {
          name: cargoConditionData.name,
        },
      });

      return cargoCondition;
    } catch (error) {
      throw new Error(`Error updating cargo condition: ${error.message}`);
    }
  }

  async deleteCargoCondition(id) {
    try {
      await prisma.cargoCondition.delete({
        where: { id: parseInt(id) },
      });

      return { message: "Cargo condition deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting cargo condition: ${error.message}`);
    }
  }

  // FreightCondition methods
  async getAllFreightConditions() {
    try {
      const freightConditions = await prisma.freightCondition.findMany();
      return freightConditions;
    } catch (error) {
      throw new Error(`Error fetching freight conditions: ${error.message}`);
    }
  }

  async getFreightConditionById(id) {
    try {
      const freightCondition = await prisma.freightCondition.findUnique({
        where: { id: parseInt(id) },
      });

      if (!freightCondition) {
        throw new Error("Freight condition not found");
      }

      return freightCondition;
    } catch (error) {
      throw new Error(`Error fetching freight condition: ${error.message}`);
    }
  }

  async createFreightCondition(freightConditionData) {
    try {
      const freightCondition = await prisma.freightCondition.create({
        data: {
          name: freightConditionData.name,
        },
      });

      return freightCondition;
    } catch (error) {
      throw new Error(`Error creating freight condition: ${error.message}`);
    }
  }

  async updateFreightCondition(id, freightConditionData) {
    try {
      const freightCondition = await prisma.freightCondition.update({
        where: { id: parseInt(id) },
        data: {
          name: freightConditionData.name,
        },
      });

      return freightCondition;
    } catch (error) {
      throw new Error(`Error updating freight condition: ${error.message}`);
    }
  }

  async deleteFreightCondition(id) {
    try {
      await prisma.freightCondition.delete({
        where: { id: parseInt(id) },
      });

      return { message: "Freight condition deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting freight condition: ${error.message}`);
    }
  }

  // CargoType methods
  async getAllCargoTypes() {
    try {
      const cargoTypes = await prisma.cargoType.findMany();
      return cargoTypes;
    } catch (error) {
      throw new Error(`Error fetching cargo types: ${error.message}`);
    }
  }

  async getCargoTypeById(id) {
    try {
      const cargoType = await prisma.cargoType.findUnique({
        where: { id: parseInt(id) },
      });

      if (!cargoType) {
        throw new Error("Cargo type not found");
      }

      return cargoType;
    } catch (error) {
      throw new Error(`Error fetching cargo type: ${error.message}`);
    }
  }

  async createCargoType(cargoTypeData) {
    try {
      const cargoType = await prisma.cargoType.create({
        data: {
          name: cargoTypeData.name,
        },
      });

      return cargoType;
    } catch (error) {
      throw new Error(`Error creating cargo type: ${error.message}`);
    }
  }

  async updateCargoType(id, cargoTypeData) {
    try {
      const cargoType = await prisma.cargoType.update({
        where: { id: parseInt(id) },
        data: {
          name: cargoTypeData.name,
        },
      });

      return cargoType;
    } catch (error) {
      throw new Error(`Error updating cargo type: ${error.message}`);
    }
  }

  async deleteCargoType(id) {
    try {
      await prisma.cargoType.delete({
        where: { id: parseInt(id) },
      });

      return { message: "Cargo type deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting cargo type: ${error.message}`);
    }
  }

  // Incoterm methods
  async getAllIncoterms() {
    try {
      const incoterms = await prisma.incoterm.findMany();
      return incoterms;
    } catch (error) {
      throw new Error(`Error fetching incoterms: ${error.message}`);
    }
  }

  async getIncotermById(id) {
    try {
      const incoterm = await prisma.incoterm.findUnique({
        where: { id: parseInt(id) },
      });

      if (!incoterm) {
        throw new Error("Incoterm not found");
      }

      return incoterm;
    } catch (error) {
      throw new Error(`Error fetching incoterm: ${error.message}`);
    }
  }

  async createIncoterm(incotermData) {
    try {
      const incoterm = await prisma.incoterm.create({
        data: {
          name: incotermData.name,
        },
      });

      return incoterm;
    } catch (error) {
      throw new Error(`Error creating incoterm: ${error.message}`);
    }
  }

  async updateIncoterm(id, incotermData) {
    try {
      const incoterm = await prisma.incoterm.update({
        where: { id: parseInt(id) },
        data: {
          name: incotermData.name,
        },
      });

      return incoterm;
    } catch (error) {
      throw new Error(`Error updating incoterm: ${error.message}`);
    }
  }

  async deleteIncoterm(id) {
    try {
      await prisma.incoterm.delete({
        where: { id: parseInt(id) },
      });

      return { message: "Incoterm deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting incoterm: ${error.message}`);
    }
  }

  // Airport methods
  async getAllAirports() {
    try {
      const airports = await prisma.airport.findMany();
      return airports;
    } catch (error) {
      throw new Error(`Error fetching airports: ${error.message}`);
    }
  }

  async getAirportById(id) {
    try {
      const airport = await prisma.airport.findUnique({
        where: { id: parseInt(id) },
      });

      if (!airport) {
        throw new Error("Airport not found");
      }

      return airport;
    } catch (error) {
      throw new Error(`Error fetching airport: ${error.message}`);
    }
  }

  async createAirport(airportData) {
    try {
      const airport = await prisma.airport.create({
        data: {
          name: airportData.name,
          address: airportData.address || null,
          country: airportData.country || null,
          code: airportData.code || null,
        },
      });

      return airport;
    } catch (error) {
      throw new Error(`Error creating airport: ${error.message}`);
    }
  }

  async updateAirport(id, airportData) {
    try {
      const airport = await prisma.airport.update({
        where: { id: parseInt(id) },
        data: {
          name: airportData.name,
          address: airportData.address || null,
          country: airportData.country || null,
          code: airportData.code || null,
        },
      });

      return airport;
    } catch (error) {
      throw new Error(`Error updating airport: ${error.message}`);
    }
  }

  async deleteAirport(id) {
    try {
      await prisma.airport.delete({
        where: { id: parseInt(id) },
      });

      return { message: "Airport deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting airport: ${error.message}`);
    }
  }

  // Warehouse methods
  async getAllWarehouses() {
    try {
      const warehouses = await prisma.warehouse.findMany();
      return warehouses;
    } catch (error) {
      throw new Error(`Error fetching warehouses: ${error.message}`);
    }
  }

  async getWarehouseById(id) {
    try {
      const warehouse = await prisma.warehouse.findUnique({
        where: { id: parseInt(id) },
      });

      if (!warehouse) {
        throw new Error("Warehouse not found");
      }

      return warehouse;
    } catch (error) {
      throw new Error(`Error fetching warehouse: ${error.message}`);
    }
  }

  async createWarehouse(warehouseData) {
    try {
      const warehouse = await prisma.warehouse.create({
        data: {
          name: warehouseData.name,
          address: warehouseData.address || null,
          country: warehouseData.country || null,
        },
      });

      return warehouse;
    } catch (error) {
      throw new Error(`Error creating warehouse: ${error.message}`);
    }
  }

  async updateWarehouse(id, warehouseData) {
    try {
      const warehouse = await prisma.warehouse.update({
        where: { id: parseInt(id) },
        data: {
          name: warehouseData.name,
          address: warehouseData.address || null,
          country: warehouseData.country || null,
        },
      });

      return warehouse;
    } catch (error) {
      throw new Error(`Error updating warehouse: ${error.message}`);
    }
  }

  async deleteWarehouse(id) {
    try {
      await prisma.warehouse.delete({
        where: { id: parseInt(id) },
      });

      return { message: "Warehouse deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting warehouse: ${error.message}`);
    }
  }

  // PackageType methods
  async getAllPackageTypes() {
    try {
      const packageTypes = await prisma.packageType.findMany();
      return packageTypes;
    } catch (error) {
      throw new Error(`Error fetching package types: ${error.message}`);
    }
  }

  async getPackageTypeById(id) {
    try {
      const packageType = await prisma.packageType.findUnique({
        where: { id: parseInt(id) },
      });

      if (!packageType) {
        throw new Error("Package type not found");
      }

      return packageType;
    } catch (error) {
      throw new Error(`Error fetching package type: ${error.message}`);
    }
  }

  async createPackageType(packageTypeData) {
    try {
      const packageType = await prisma.packageType.create({
        data: {
          name: packageTypeData.name,
        },
      });

      return packageType;
    } catch (error) {
      throw new Error(`Error creating package type: ${error.message}`);
    }
  }

  async updatePackageType(id, packageTypeData) {
    try {
      const packageType = await prisma.packageType.update({
        where: { id: parseInt(id) },
        data: {
          name: packageTypeData.name,
        },
      });

      return packageType;
    } catch (error) {
      throw new Error(`Error updating package type: ${error.message}`);
    }
  }

  async deletePackageType(id) {
    try {
      await prisma.packageType.delete({
        where: { id: parseInt(id) },
      });

      return { message: "Package type deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting package type: ${error.message}`);
    }
  }
}

module.exports = new MantenedoresService();
