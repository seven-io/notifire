/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type UnseenCountResponse = {
  count: number;
};

/** @internal */
export const UnseenCountResponse$inboundSchema: z.ZodType<
  UnseenCountResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  count: z.number(),
});

/** @internal */
export type UnseenCountResponse$Outbound = {
  count: number;
};

/** @internal */
export const UnseenCountResponse$outboundSchema: z.ZodType<
  UnseenCountResponse$Outbound,
  z.ZodTypeDef,
  UnseenCountResponse
> = z.object({
  count: z.number(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace UnseenCountResponse$ {
  /** @deprecated use `UnseenCountResponse$inboundSchema` instead. */
  export const inboundSchema = UnseenCountResponse$inboundSchema;
  /** @deprecated use `UnseenCountResponse$outboundSchema` instead. */
  export const outboundSchema = UnseenCountResponse$outboundSchema;
  /** @deprecated use `UnseenCountResponse$Outbound` instead. */
  export type Outbound = UnseenCountResponse$Outbound;
}

export function unseenCountResponseToJSON(
  unseenCountResponse: UnseenCountResponse,
): string {
  return JSON.stringify(
    UnseenCountResponse$outboundSchema.parse(unseenCountResponse),
  );
}

export function unseenCountResponseFromJSON(
  jsonString: string,
): SafeParseResult<UnseenCountResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UnseenCountResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UnseenCountResponse' from JSON`,
  );
}
