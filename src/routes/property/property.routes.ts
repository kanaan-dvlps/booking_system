import { IProperty, IReturnProperties, IReturnProperty } from "../../interfaces/property.interface";
import { getPropertiesController, getPropertyByIdController, getPropertyByOwnerIdController, createPropertyController, updatePropertyByIdController, deletePropertyByIdController } from "../../controllers/property/property.controller";
import { authenticateJWT } from "../../middleware/auth";
import { Router } from "express";
import { ApiMessages } from "../../constants/api.messages";
import Joi from "joi";
import { IExtendedRequest } from "../../interfaces/extendedRequest.interface";
import { IReturnUser } from "../../interfaces/users.interface";
import { ROLES } from "../../database/constants/table.constant";
import { getUserRole } from "../../helpers/getUserRole.helper";

const router = Router();

router.get("/", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const properties = await getPropertiesController();
    const { id } = req.user as Partial<IReturnUser>;
    const role = await getUserRole(id as string);
    const isPropertyOwner = role?.role === ROLES.PROPERTY_OWNER;

    if (!(isPropertyOwner) || null) {
      res.status(403).json({
        type: ApiMessages.FORBIDDEN,
        response: "Forbidden"
      });
    } else {
      res.status(200).json({
        type: ApiMessages.SUCCESS,
        response: properties
      });
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.get("/:id", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "Id is required"
      });
    } else {
      const property = await getPropertyByIdController(id);
      if (!property) {
        res.status(404).json({
          type: ApiMessages.NOT_FOUND,
          response: "Property not found"
        });
      } else {
        const { id } = req.user as Partial<IReturnUser>;
        const role = await getUserRole(id as string);
        const isPropertyOwner = role?.role === ROLES.PROPERTY_OWNER;

        if (!(isPropertyOwner) || null) {
          res.status(403).json({
            type: ApiMessages.FORBIDDEN,
            response: "Forbidden"
          });
        } else {
          res.status(200).json({
            type: ApiMessages.SUCCESS,
            response: property
          });
        }
      }
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.get("/owner/:ownerId", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { ownerId } = req.params;
    if (!ownerId) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "Owner Id is required"
      });
    } else {
      const { id } = req.user as Partial<IReturnUser>;
        const role = await getUserRole(id as string);
        const isPropertyOwner = role?.role === ROLES.PROPERTY_OWNER;
        if (!(isPropertyOwner) || null) {
          res.status(403).json({
            type: ApiMessages.FORBIDDEN,
            response: "Forbidden"
          });
        } else {
          const properties = await getPropertyByOwnerIdController(ownerId);
          res.status(200).json({
            type: ApiMessages.SUCCESS,
            response: properties
          });
        }
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.post("/", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { name } = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: error.message
      });
    } else {
      const { id } = req.user as Partial<IReturnUser>;
      const role = await getUserRole(id as string);
      const isPropertyOwner = role?.role === ROLES.PROPERTY_OWNER;
      if (!(isPropertyOwner) || null) {
        res.status(403).json({
          type: ApiMessages.FORBIDDEN,
          response: "Forbidden"
        });
      } else {
        const property = await createPropertyController({
          name,
          user_id: id
        } as IProperty);
        res.status(200).json({
          type: ApiMessages.SUCCESS,
          response: property
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.put("/:id", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      location: Joi.string().required(),
      owner_id: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: error.message
      });
    } else {
      const property = await updatePropertyByIdController(id, name);
      if (!property) {
        res.status(404).json({
          type: ApiMessages.NOT_FOUND,
          response: "Property not found"
        });
      } else {
        const { id } = req.user as Partial<IReturnUser>;
        const role = await getUserRole(id as string);
        const isPropertyOwner = role?.role === ROLES.PROPERTY_OWNER;
        if (!(isPropertyOwner) || null) {
          res.status(403).json({
            type: ApiMessages.FORBIDDEN,
            response: "Forbidden"
          });
        } else {
          res.status(200).json({
            type: ApiMessages.SUCCESS,
            response: property
          });
        }
      }
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.delete("/:id", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "Id is required"
      });
    } else {
      const property = await deletePropertyByIdController(id);
      if (!property) {
        res.status(404).json({
          type: ApiMessages.NOT_FOUND,
          response: "Property not found"
        });
      } else {
        const { id } = req.user as Partial<IReturnUser>;
        const role = await getUserRole(id as string);
        const isPropertyOwner = role?.role === ROLES.PROPERTY_OWNER;
        if (!(isPropertyOwner) || null) {
          res.status(403).json({
            type: ApiMessages.FORBIDDEN,
            response: "Forbidden"
          });
        } else {
          res.status(200).json({
            type: ApiMessages.DELETED,
            response: property
          });
        }
      }
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

export default router;