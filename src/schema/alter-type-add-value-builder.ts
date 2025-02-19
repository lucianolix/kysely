
import { OperationNodeSource } from '../operation-node/operation-node-source.js'
import { CompiledQuery } from '../query-compiler/compiled-query.js'
import { Compilable } from '../util/compilable.js'
import { QueryExecutor } from '../query-executor/query-executor.js'
import { QueryId } from '../util/query-id.js'
import { freeze } from '../util/object-utils.js'
import { AlterTypeNode } from '../operation-node/alter-type-node.js'
import { AlterTypeExecutor } from './alter-type-executor.js'
import { IdentifierNode } from '../operation-node/identifier-node.js'
import { AlterTypeBuilder } from './alter-type-builder.js'
import { AddValueNode } from '../operation-node/add-value-node.js'

export class AlterTypeAddValueBuilder implements OperationNodeSource, Compilable  {
    readonly #props: AlterTypeAddValueBuilderProps

    constructor(props: AlterTypeAddValueBuilderProps) {
        this.#props = freeze(props)
    }

    ifNotExists() {
        return new AlterTypeAddValueBuilder({
            ...this.#props,
            node: AlterTypeNode.cloneWithAlterTypeProps(this.#props.node, {
                addValue: AddValueNode.cloneWithAddValueProps(this.#props.node.addValue!, {
                    ifNotExists: true
                })
            })
        })
    }

    before(value: string) {
        return new AlterTypeExecutor({
            ...this.#props,
            node: AlterTypeNode.cloneWithAlterTypeProps(this.#props.node, {
                addValue: AddValueNode.cloneWithAddValueProps(this.#props.node.addValue!, {
                    before: IdentifierNode.create(value)
                })
            })
        })
    }
    after(value: string) {
        return new AlterTypeExecutor({
            ...this.#props,
            node: AlterTypeNode.cloneWithAlterTypeProps(this.#props.node, {
                addValue: AddValueNode.cloneWithAddValueProps(this.#props.node.addValue!, {
                    after: IdentifierNode.create(value)
                })
            })
        })
    }

    $call<T>(func: (qb: this) => T): T {
        return func(this)
      }
      toOperationNode(): AlterTypeNode {
        return this.#props.executor.transformQuery(
            this.#props.node,
            this.#props.queryId,
        )
    }

    compile(): CompiledQuery {
        return this.#props.executor.compileQuery(
          this.toOperationNode(),
          this.#props.queryId,
        )
      }
}


export interface AlterTypeAddValueBuilderProps {
    readonly queryId: QueryId
    readonly executor: QueryExecutor
    readonly node: AlterTypeNode
}