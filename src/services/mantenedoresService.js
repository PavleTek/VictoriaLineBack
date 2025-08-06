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
}

module.exports = new MantenedoresService();
