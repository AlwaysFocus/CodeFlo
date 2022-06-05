import {
  DefaultPrivacyLevel,
  EpicorFunction,
  EpicorFunctionBody,
  EpicorFunctionSignature,
} from "models";

export class EpicorFunctionBuilder {
  private id: string = "";
  private uuid: string = "";
  private userId: string = "";
  private functionId: string = "";
  private description: string = "";
  private kind: 2 = 2;
  private requireTransaction: boolean = false;
  private singleRowMode: boolean = false;
  private private: boolean = false;
  private disabled: boolean = false;
  private invalid: boolean = false;
  private thumbnail?: any = undefined;
  private body: EpicorFunctionBody | string | null = null;
  private functionSignature: EpicorFunctionSignature[] | null = [];
  private privacyLevel: DefaultPrivacyLevel = DefaultPrivacyLevel.public;
  private isDeleted: boolean = false;
  private createdAt: Date = new Date();
  private modifiedAt: Date = new Date();

  public build(): EpicorFunction {
    return {
      id: this.id,
      uuid: this.uuid,
      userId: this.userId,
      functionId: this.functionId,
      description: this.description,
      kind: this.kind,
      requireTransaction: this.requireTransaction,
      singleRowMode: this.singleRowMode,
      private: this.private,
      disabled: this.disabled,
      invalid: this.invalid,
      thumbnail: this.thumbnail,
      body: this.body,
      functionSignature: this.functionSignature,
      privacyLevel: this.privacyLevel,
      isDeleted: this.isDeleted,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
    };
  }

  public withId(value: string) {
    this.id = value;
    return this;
  }

  public withUuid(value: string) {
    this.uuid = value;
    return this;
  }

  public withUserId(value: string) {
    this.userId = value;
    return this;
  }

  public withFunctionId(value: string) {
    this.functionId = value;
    return this;
  }

  public withDescription(value: string) {
    this.description = value;
    return this;
  }

  public withKind(value: 2) {
    this.kind = value;
    return this;
  }

  public withRequireTransaction(value: boolean) {
    this.requireTransaction = value;
    return this;
  }

  public withSingleRowMode(value: boolean) {
    this.singleRowMode = value;
    return this;
  }

  public withPrivate(value: boolean) {
    this.private = value;
    return this;
  }

  public withDisabled(value: boolean) {
    this.disabled = value;
    return this;
  }

  public withInvalid(value: boolean) {
    this.invalid = value;
    return this;
  }

  public withThumbnail(value: any) {
    this.thumbnail = value;
    return this;
  }

  public withBody(value: EpicorFunctionBody | string | null) {
    this.body = value;
    return this;
  }

  public withFunctionSignature(value: EpicorFunctionSignature[] | null) {
    this.functionSignature = value;
    return this;
  }

  public withPrivacyLevel(value: DefaultPrivacyLevel) {
    this.privacyLevel = value;
    return this;
  }

  public withIsDeleted(value: boolean) {
    this.isDeleted = value;
    return this;
  }

  public withCreatedAt(value: Date) {
    this.createdAt = value;
    return this;
  }

  public withModifiedAt(value: Date) {
    this.modifiedAt = value;
    return this;
  }
}
